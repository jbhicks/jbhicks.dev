package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/jbhicks/jbhicks.dev/handlers" // Use the full package path
)

func setupRouter() *gin.Engine {
	r := gin.Default()
	r.LoadHTMLGlob("templates/*")

	// Health check
	r.GET("/health", func(c *gin.Context) {
		c.String(http.StatusOK, "OK")
	})

	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"title": "Main website",
		})
	})

	r.GET("/api/soundcloud/stream", handlers.HandleGetSoundcloudStream)
	r.Static("/static", "./static")

	return r
}

func main() {
	r := setupRouter()
	r.Run(":3000")
}
