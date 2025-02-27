package handlers

import (
	"encoding/json"
	"encoding/xml"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"sort"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

// RSS feed structure
type RSS struct {
	XMLName xml.Name `xml:"rss"`
	Channel Channel  `xml:"channel"`
}

type Channel struct {
	Title       string `xml:"title"`
	Description string `xml:"description"`
	Link        string `xml:"link"`
	Items       []Item `xml:"item"`
}

type Item struct {
	Title       string `xml:"title"`
	Link        string `xml:"link"`
	Description string `xml:"description"`
	PubDate     string `xml:"pubDate"`
	Source      string `xml:"-"` // Track the source feed
	PublishedAt time.Time
	TimePassed  string
	ImageURL    string `xml:"-"` // Store the image URL from the feed
}

// NewsResponse holds all news items from various sources
type NewsResponse struct {
	Collection  []Item    `json:"collection"`
	LastUpdated time.Time `json:"lastUpdated"`
}

// Feed configuration
type FeedConfig struct {
	Name string `json:"name"`
	URL  string `json:"url"`
}

// Default feeds to fetch
var defaultFeeds = []FeedConfig{
	{Name: "Hacker News", URL: "https://news.ycombinator.com/rss"},
	{Name: "The Verge", URL: "https://www.theverge.com/rss/index.xml"},
	{Name: "TechCrunch", URL: "https://techcrunch.com/feed/"},
}

// HandleGetNews handles the GET /api/news endpoint
func HandleGetNews(c *gin.Context) {
	log.Printf("[GET] news")

	news, err := getCachedNews()
	if err != nil {
		log.Printf("Error while fetching news from cache, loading fresh...")
		LoadNewsCache()
		news, _ = getCachedNews()
	}

	if time.Since(news.LastUpdated).Hours() >= 1 {
		log.Printf("More than 1 hour has passed, loading news cache")
		LoadNewsCache()
		news, _ = getCachedNews()
	}

	log.Printf("Got News Items: %d", len(news.Collection))
	c.Writer.Header().Set("Content-Type", "text/html")

	// Execute the news-content template instead of news.html
	c.HTML(http.StatusOK, "news-content", news)
}

// LoadNewsCache fetches and caches RSS feeds
func LoadNewsCache() {
	var newsResponse NewsResponse
	newsResponse.LastUpdated = time.Now()

	// Get custom feeds if configured
	feeds := getConfiguredFeeds()

	// Fetch and process each feed
	for _, feed := range feeds {
		items, err := fetchRSSFeed(feed.URL, feed.Name)
		if err != nil {
			log.Printf("Error fetching RSS feed %s: %v", feed.Name, err)
			continue
		}
		newsResponse.Collection = append(newsResponse.Collection, items...)
	}

	// Sort news items by published date, newest first
	sort.Slice(newsResponse.Collection, func(i, j int) bool {
		return newsResponse.Collection[i].PublishedAt.After(newsResponse.Collection[j].PublishedAt)
	})

	// Store the results
	storeNewsCache(&newsResponse)
}

// getConfiguredFeeds returns the list of feeds to fetch
func getConfiguredFeeds() []FeedConfig {
	// Try to read from a config file
	file, err := os.Open("news-feeds.json")
	if err != nil {
		log.Println("No custom feeds configuration found, using defaults")
		return defaultFeeds
	}
	defer file.Close()

	var feeds []FeedConfig
	err = json.NewDecoder(file).Decode(&feeds)
	if err != nil {
		log.Println("Error reading feeds configuration, using defaults")
		return defaultFeeds
	}

	return feeds
}

// fetchRSSFeed retrieves and parses an RSS feed
func fetchRSSFeed(url string, sourceName string) ([]Item, error) {
	log.Printf("Fetching RSS feed from %s", url)

	// Make the HTTP request
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	// Read and parse the RSS content
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var rss RSS
	err = xml.Unmarshal(body, &rss)
	if err != nil {
		return nil, err
	}

	var items []Item
	for _, item := range rss.Channel.Items {
		// Parse publication date
		pubTime, err := parsePublicationDate(item.PubDate)
		if err != nil {
			log.Printf("Error parsing date %s: %v", item.PubDate, err)
			pubTime = time.Now() // Default to current time if parsing fails
		}

		// Set source and formatted times
		item.Source = sourceName
		item.PublishedAt = pubTime
		item.TimePassed = formatTimePassed(pubTime)

		// Extract image URL from the description
		item.ImageURL = extractImageFromDescription(item.Description)

		items = append(items, item)
	}

	log.Printf("Fetched %d items from %s", len(items), sourceName)
	return items, nil
}

// parsePublicationDate handles various date formats commonly used in RSS feeds
func parsePublicationDate(dateStr string) (time.Time, error) {
	formats := []string{
		time.RFC1123Z,
		time.RFC1123,
		time.RFC822Z,
		time.RFC822,
		"Mon, 02 Jan 2006 15:04:05 -0700",
		"2006-01-02T15:04:05Z",
		"2006-01-02T15:04:05-07:00",
	}

	for _, format := range formats {
		t, err := time.Parse(format, dateStr)
		if err == nil {
			return t, nil
		}
	}

	return time.Time{}, fmt.Errorf("unable to parse date: %s", dateStr)
}

// formatTimePassed returns a human-readable time elapsed string
func formatTimePassed(t time.Time) string {
	duration := time.Since(t)

	if duration.Hours() >= 24 {
		days := int(duration.Hours() / 24)
		return fmt.Sprintf("%d days ago", days)
	} else if duration.Hours() >= 1 {
		hours := int(duration.Hours())
		return fmt.Sprintf("%d hours ago", hours)
	} else if duration.Minutes() >= 1 {
		minutes := int(duration.Minutes())
		return fmt.Sprintf("%d minutes ago", minutes)
	} else {
		return "just now"
	}
}

// storeNewsCache saves the news data to a JSON file
func storeNewsCache(news *NewsResponse) error {
	bytes, err := json.Marshal(news)
	if err != nil {
		return err
	}

	file, err := os.Create("news-feed.json")
	if err != nil {
		return err
	}
	defer file.Close()

	_, err = file.Write(bytes)
	return err
}

// getCachedNews reads news from the cache file
func getCachedNews() (*NewsResponse, error) {
	file, err := os.Open("news-feed.json")
	if err != nil {
		return nil, errors.New("news cache miss")
	}
	defer file.Close()

	var cachedResponse NewsResponse
	err = json.NewDecoder(file).Decode(&cachedResponse)
	if err != nil {
		return nil, errors.New("failed to read from news cache file")
	}

	return &cachedResponse, nil
}

// extractImageFromDescription extracts the first image URL from an HTML description
func extractImageFromDescription(description string) string {
	// Look for img tag
	imgStartIndex := strings.Index(description, "<img")
	if imgStartIndex == -1 {
		return ""
	}

	// Find src attribute
	srcStartIndex := strings.Index(description[imgStartIndex:], "src=")
	if srcStartIndex == -1 {
		return ""
	}

	srcStartIndex += imgStartIndex + 4 // Add "src=" length

	// Determine if quote is single or double
	var quoteChar byte
	if srcStartIndex < len(description) && description[srcStartIndex] == '"' {
		quoteChar = '"'
	} else if srcStartIndex < len(description) && description[srcStartIndex] == '\'' {
		quoteChar = '\''
	} else {
		// Handle case where there are no quotes (less common)
		spaceIndex := strings.IndexByte(description[srcStartIndex:], ' ')
		if spaceIndex == -1 {
			closingIndex := strings.Index(description[srcStartIndex:], ">")
			if closingIndex == -1 {
				return ""
			}
			return strings.TrimSpace(description[srcStartIndex : srcStartIndex+closingIndex])
		}
		return strings.TrimSpace(description[srcStartIndex : srcStartIndex+spaceIndex])
	}

	// Skip the quote character
	srcStartIndex++

	// Find the closing quote
	srcEndIndex := strings.IndexByte(description[srcStartIndex:], quoteChar)
	if srcEndIndex == -1 {
		return ""
	}

	// Extract the URL
	imageURL := description[srcStartIndex : srcStartIndex+srcEndIndex]

	// Simple URL validation - could be expanded
	if !strings.HasPrefix(imageURL, "http") && !strings.HasPrefix(imageURL, "https") {
		// Handle relative URLs - skipping for simplicity but you might want to resolve these
		if strings.HasPrefix(imageURL, "//") {
			imageURL = "https:" + imageURL
		}
	}

	return imageURL
}
