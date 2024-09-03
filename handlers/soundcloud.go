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

		offsetInt, err := strconv.Atoi(offset)
		if err != nil {
			http.Error(w, "Invalid offset parameter", http.StatusBadRequest)
			return
		}

		limitInt, err := strconv.Atoi(limit)
		if err != nil {
			http.Error(w, "Invalid limit parameter", http.StatusBadRequest)
			return
		}

		if err := json.NewEncoder(w).Encode(map[string]interface{}{
			"tracks": fetchSoundCloudStream(offsetInt, limitInt),
		}); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	})
}

func fetchSoundCloudStream(offset int, limit int) string {
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
