package main

import (
	"log"
	"os"

	// "github.com/jbhicks/jbhicks.dev/db"
	"github.com/jbhicks/jbhicks.dev/server"
)

func main() {
	logger := log.New(os.Stdout, "", 0)
	// db.InitDB()
	// defer db.DB.Close()

	s := server.New(server.Options{
		Host: "localhost",
		Log:  logger,
		Port: 8080,
	})

	if err := s.Start(); err != nil {
		logger.Fatalln("Error starting server:", err)
	}
}
