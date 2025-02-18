package main

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/jbhicks/jbhicks.dev/handlers"
)

func setupRouter() *gin.Engine {
	r := gin.New()
	r.LoadHTMLGlob("templates/*")

	// Health chek
	r.GET("/health", func(c *gin.Context) {
		c.String(http.StatusOK, "OK")
	})

	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"title": "jbhicks.dev",
		})
	})

	r.GET("/api/soundcloud/stream", handlers.HandleGetSoundcloudStream)
	r.GET("/api/soundcloud/favorites", handlers.HandleGetSoundcloudFavorites)

	r.Static("/static", "./static")
	r.Static("/templates", "./templates")

	return r
}

func main() {

	go func() {
		for range time.Tick(1 * time.Hour) { // Run this loop once every hour
			log.Println("Loading cache...")
			handlers.LoadCache("soundcloud-stream", true)
			handlers.LoadCache("soundcloud-favorites", false)
		}
	}()

	r := setupRouter()

	r.Run(":3000")
}
