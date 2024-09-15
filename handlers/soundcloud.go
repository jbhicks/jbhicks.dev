package handlers

import (
	"compress/gzip"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/go-chi/chi"
)

func GetStream(mux chi.Router) {
	mux.Get("/soundcloud/stream", func(w http.ResponseWriter, r *http.Request) {
		offset := r.URL.Query().Get("offset")
		limit := r.URL.Query().Get("limit")

		if offset == "" {
			offset = "1"
		}
		if limit == "" {
			limit = "100"
		}

		offsetInt, _ := strconv.Atoi(offset)
		limitInt, _ := strconv.Atoi(limit)

		if err := json.NewEncoder(w).Encode(map[string]interface{}{
			"tracks": FetchSoundCloudStream(offsetInt, limitInt),
		}); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	})
}

func FetchSoundCloudStream(offset int, limit int) string {
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

	url := fmt.Sprintf("https://api-v2.soundcloud.com/stream?offset=%d&sc_a_id=%s&limit=%d&promoted_playlist=true&client_id=%s&app_version=1660231961&app_locale=en", offset, sc_a_id, limit, sc_client_id)
	fmt.Println("Authorization:", authorization)
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
		return ""
	}

	for key, value := range headers {
		req.Header.Set(key, value)
	}

	resp, err := client.Do(req)
	if err != nil {
		log.Printf("Error making request: %v", err)
		return ""
	}
	defer resp.Body.Close()

	var reader io.ReadCloser
	switch resp.Header.Get("Content-Encoding") {
	case "gzip":
		reader, err = gzip.NewReader(resp.Body)
		if err != nil {
			log.Printf("Error creating gzip reader: %v", err)
			return ""
		}
		defer reader.Close()
	default:
		reader = resp.Body
	}

	body, err := io.ReadAll(reader)
	if err != nil {
		log.Printf("Error reading response body: %v", err)
		return ""
	}

	return string(body)
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
	Collection []TrackItem `json:"collection"`
	NextHref   string      `json:"next_href"`
	QueryUrn   *string     `json:"query_urn"`
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
	FullDuration     int     `json:"full_duration"`
	EmbeddableBy     string  `json:"embeddable_by"`
	Genre            string  `json:"genre"`
	HasDownloadsLeft bool    `json:"has_downloads_left"`
	ID               int     `json:"id"`
	Kind             string  `json:"kind"`
	LabelName        *string `json:"label_name"`
	LastModified     string  `json:"last_modified"`
	License          string  `json:"license"`
}
