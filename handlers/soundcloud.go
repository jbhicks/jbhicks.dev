package handlers

import (
	"compress/gzip"
	"encoding/json"
	"errors"
	"fmt"
	"html/template"
	"io"
	"log"
	"net/http"
	"os"
	"sort"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

// Handle the GET /soundcloud/favorites endpoint
func HandleGetSoundcloudFavorites(c *gin.Context) {
	handleSoundcloudRequest(c, "soundcloud-favorites", false)
}

// Handle the GET /soundcloud/stream endpoint
func HandleGetSoundcloudStream(c *gin.Context) {
	handleSoundcloudRequest(c, "soundcloud-stream", true)
}

// Common function to handle Soundcloud requests
func handleSoundcloudRequest(c *gin.Context, key string, filter bool) {
	log.Printf("[GET] %s", key)
	// LoadCache(key, filter) // debug force load cache
	mixes, err := getCachedMixes(key)
	if err != nil {
		log.Printf("Error while fetching data from cache for %s, loading fresh...", key)
		LoadCache(key, filter)
		mixes, _ = getCachedMixes(key)
	}

	if time.Since(mixes.LastUpdated).Hours() >= 1 {
		log.Printf("More than 1 hour has passed, loading cache for %s", key)
		LoadCache(key, filter)
		mixes, _ = getCachedMixes(key)
	}

	log.Printf("Got Mixes: %s, %d", key, len(mixes.Collection))
	c.Writer.Header().Set("Content-Type", "text/html")
	tmpl := template.Must(template.ParseFiles("templates/mixes.html"))
	if err := tmpl.ExecuteTemplate(c.Writer, "mixes.html", mixes); err != nil {
		http.Error(c.Writer, err.Error(), http.StatusInternalServerError)
	}
}

func LoadCache(key string, filter bool) {
	offset := 0
	limit := 100
	var tracks TracksResponse
	tracks.LastUpdated = time.Now()
	trackIDs := make(map[int]bool) // Map to track unique track IDs

	log.Printf("Fetching Soundcloud data for key: %s", key)
	if filter {
		// Filter until we have 100 unique tracks
		for len(tracks.Collection) < limit {
			fetchedTracks := FetchSoundcloudData(key, offset, limit)
			if len(fetchedTracks.Collection) == 0 {
				log.Printf("No more tracks to fetch for key: %s", key)
				break
			}
			fetchedTracks = filterTracks(&fetchedTracks)
			for _, track := range fetchedTracks.Collection {
				if !trackIDs[track.Track.ID] {
					tracks.Collection = append(tracks.Collection, track)
					trackIDs[track.Track.ID] = true
				}
			}
			offset += limit
		}
	} else {
		// Fetch tracks without additional filtering
		fetchedTracks := FetchSoundcloudData(key, offset, limit)
		tracks.Collection = append(tracks.Collection, fetchedTracks.Collection...)
	}

	// Sort tracks by CreatedAt in reverse order
	sort.Slice(tracks.Collection, func(i, j int) bool {
		timeI, errI := time.Parse(time.RFC3339, tracks.Collection[i].Track.CreatedAt)
		timeJ, errJ := time.Parse(time.RFC3339, tracks.Collection[j].Track.CreatedAt)
		if errI != nil || errJ != nil {
			return false
		}
		return timeI.After(timeJ)
	})

	// Set display properties for each track
	for _, track := range tracks.Collection {
		track.Track.DurationText = setDurationText(track.Track.Duration)
		track.Track.TimePassed = setTimePassed(track.Track.CreatedAt)
	}

	log.Printf("Sorted tracks by CreatedAt: %v", len(tracks.Collection))
	storeCachedResponse(&tracks, key)
}

func setTimePassed(s string) string {
	t, err := time.Parse(time.RFC3339, s)
	if err != nil {
		return ""
	}
	// Format the duration since as x days ago
	duration := time.Since(t)
	var result string
	if duration.Hours() >= 24 {
		days := int(duration.Hours() / 24)
		result = fmt.Sprintf("%d days ago", days)
	} else if duration.Hours() >= 1 {
		hours := int(duration.Hours())
		result = fmt.Sprintf("%d hours ago", hours)
	}
	return result
}

func storeCachedResponse(mixes *TracksResponse, key string) error {
	bytes, err := json.Marshal(mixes)
	if err != nil {
		return err
	}

	file, err := os.Create(key + ".json")
	if err != nil {
		return err
	}
	defer file.Close()

	_, err = file.Write(bytes)
	if err != nil {
		return err
	}

	return nil
}

func getCachedMixes(key string) (*TracksResponse, error) {
	file, err := os.Open(key + ".json")
	if err != nil {
		return nil, errors.New("cache miss")
	}
	defer file.Close()

	var cachedResponse TracksResponse

	err = json.NewDecoder(file).Decode(&cachedResponse)
	if err != nil {
		return nil, errors.New("failed to read from cache file: " + key + ".json")
	}

	return &cachedResponse, nil
}

func filterTracks(tracks *TracksResponse) TracksResponse {
	var filteredTracks TracksResponse
	for _, track := range tracks.Collection {
		if track.Track != nil &&
			track.Track.Duration > 1750000 &&
			!strings.Contains(track.Type, "playlist") { // check duration greater than ~30m
			filteredTracks.Collection = append(filteredTracks.Collection, track)
		}
	}
	return filteredTracks
}

func setDurationText(duration int) string {
	seconds := duration / 1000
	minutes := seconds / 60
	hours := minutes / 60

	// Construct the time string with optional hour part only if hours > 0
	if hours > 0 {
		return fmt.Sprintf("%2dh %2dm", hours, minutes%60)
	} else {
		return fmt.Sprintf("%02dm", minutes)
	}
}

func FetchSoundcloudData(endpoint string, offset int, limit int) TracksResponse {
	log.Printf("Fetching data from Soundcloud for endpoint: %s, offset: %d, limit: %d", endpoint, offset, limit)
	authorization := os.Getenv("sc_auth_token")
	sc_a_id := os.Getenv("sc_a_id")
	sc_client_id := os.Getenv("sc_client_id")

	if authorization == "" {
		fmt.Println("Warning: sc_auth_token is blank")
	}
	if sc_a_id == "" {
		fmt.Println("Warning: sc_a_id is blank")
	}
	if sc_client_id == "" {
		fmt.Println("Warning: sc_client_id is blank")
	}

	var url string
	if endpoint == "soundcloud-stream" {
		url = fmt.Sprintf("https://api-v2.soundcloud.com/stream?offset=%d&sc_a_id=%s&limit=%d&promoted_playlist=true&client_id=%s&app_version=1660231961&app_locale=en", offset, sc_a_id, limit, sc_client_id)
	} else if endpoint == "soundcloud-favorites" {
		url = fmt.Sprintf("https://api-v2.soundcloud.com/users/141564746/track_likes?offset=%d&limit=%d&client_id=%s&app_version=1731681989&app_locale=en", offset, limit, sc_client_id)
	} else {
		log.Printf("Unsupported endpoint: %s", endpoint)
		return TracksResponse{}
	}

	headers := map[string]string{
		"Accept":             "application/json, text/javascript, */*; q=0.01",
		"Accept-Encoding":    "gzip, deflate, br",
		"Accept-Language":    "en-US,en;q=0.9",
		"Authorization":      authorization,
		"Connection":         "keep-alive",
		"Host":               "api-v2.soundcloud.com",
		"Origin":             "https://soundcloud.com",
		"Referer":            "https://soundcloud.com/",
		"Sec-Fetch-Dest":     "empty",
		"Sec-Fetch-Mode":     "cors",
		"Sec-Fetch-Site":     "same-site",
		"User-Agent":         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36 Edg/101.0.1210.53",
		"sec-ch-ua":          "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"101\", \"Microsoft Edge\";v=\"101\"",
		"sec-ch-ua-mobile":   "?0",
		"sec-ch-ua-platform": "\"Windows\"",
	}

	client := &http.Client{}
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Printf("Error creating request: %v", err)
		return TracksResponse{}
	}

	for key, value := range headers {
		req.Header.Set(key, value)
	}

	resp, err := client.Do(req)
	if err != nil {
		log.Printf("Error making request: %v", err)
		return TracksResponse{}
	}
	defer resp.Body.Close()

	// Check the content encoding and decompress if necessary
	var body []byte
	switch resp.Header.Get("Content-Encoding") {
	case "gzip":
		reader, err := gzip.NewReader(resp.Body)
		if err != nil {
			log.Printf("Error creating gzip reader: %v", err)
			return TracksResponse{}
		}
		body, err = io.ReadAll(reader)
		if err != nil {
			log.Printf("Error reading decompressed response body: %v", err)
			return TracksResponse{}
		}
	default:
		// If not GZIP, just read the entire body
		bodyBytes, err := io.ReadAll(resp.Body)
		if err != nil {
			log.Printf("Error reading response body: %v", err)
			return TracksResponse{}
		}
		body = bodyBytes
	}

	var tracksResponse TracksResponse
	if err := json.Unmarshal(body, &tracksResponse); err != nil {
		log.Printf("Error unmarshalling response: %v", err)
		return TracksResponse{}
	}
	log.Printf("Fetched %d tracks from Soundcloud for endpoint: %s", len(tracksResponse.Collection), endpoint)
	return tracksResponse
}

func PrettyPrint(data ...interface{}) {
	for _, item := range data {
		prettyJSON, err := json.MarshalIndent(item, "", "  ")
		if err != nil {
			fmt.Printf("Error pretty printing: %v\n", err)
			continue
		}
		fmt.Println(string(prettyJSON))
	}
}

type SoundCloudResponse struct {
	Tracks string `json:"tracks"`
}

type TracksResponse struct {
	Collection  []TrackItem `json:"collection"`
	NextHref    string      `json:"next_href"`
	QueryUrn    *string     `json:"query_urn"`
	LastUpdated time.Time
}

type TrackItem struct {
	CreatedAt string    `json:"created_at"`
	Type      string    `json:"type"`
	User      User      `json:"user"`
	UUID      string    `json:"uuid"`
	Caption   *string   `json:"caption"`
	Reposted  *Reposted `json:"reposted,omitempty"`
	Playlist  *Playlist `json:"playlist,omitempty"`
	Track     *Track    `json:"track,omitempty"`
}

type User struct {
	AvatarURL        string  `json:"avatar_url"`
	FirstName        string  `json:"first_name"`
	FollowersCount   int     `json:"followers_count"`
	FullName         string  `json:"full_name"`
	ID               int     `json:"id"`
	Kind             string  `json:"kind"`
	LastModified     string  `json:"last_modified"`
	LastName         string  `json:"last_name"`
	Permalink        string  `json:"permalink"`
	PermalinkURL     string  `json:"permalink_url"`
	URI              string  `json:"uri"`
	URN              string  `json:"urn"`
	Username         string  `json:"username"`
	Verified         bool    `json:"verified"`
	City             string  `json:"city"`
	CountryCode      *string `json:"country_code"`
	Badges           Badges  `json:"badges"`
	StationUrn       string  `json:"station_urn"`
	StationPermalink string  `json:"station_permalink"`
}

type Badges struct {
	Pro            bool `json:"pro"`
	CreatorMidTier bool `json:"creator_mid_tier"`
	ProUnlimited   bool `json:"pro_unlimited"`
	Verified       bool `json:"verified"`
}

type Reposted struct {
	TargetUrn string  `json:"target_urn"`
	UserUrn   string  `json:"user_urn"`
	Caption   *string `json:"caption"`
}

type Playlist struct {
	// Add playlist fields as needed
}

type Track struct {
	ArtworkURL       string  `json:"artwork_url"`
	Caption          *string `json:"caption"`
	Commentable      bool    `json:"commentable"`
	CommentCount     int     `json:"comment_count"`
	CreatedAt        string  `json:"created_at"`
	Description      string  `json:"description"`
	Downloadable     bool    `json:"downloadable"`
	DownloadCount    int     `json:"download_count"`
	Duration         int     `json:"duration"`
	DurationText     string  `json:"duration_text"`
	FullDuration     int     `json:"full_duration"`
	EmbeddableBy     string  `json:"embeddable_by"`
	Genre            string  `json:"genre"`
	HasDownloadsLeft bool    `json:"has_downloads_left"`
	ID               int     `json:"id"`
	Kind             string  `json:"kind"`
	LabelName        *string `json:"label_name"`
	LastModified     string  `json:"last_modified"`
	License          string  `json:"license"`
	Title            string  `json:"title"`
	TimePassed       string  `json:"time_passed"`
	PermalinkURL     string  `json:"permalink_url"`
	User             User    `json:"user,omitempty"`
	Media            Media   `json:"media"`
}

type Media struct {
	Transcodings []struct {
		URL      string `json:"url"`
		Preset   string `json:"preset"`
		Duration int    `json:"duration"`
		Snipped  bool   `json:"snipped"`
		Format   struct {
			Protocol string `json:"protocol"`
			MimeType string `json:"mime_type"`
		} `json:"format"`
		Quality string `json:"quality"`
	} `json:"transcodings"`
}
