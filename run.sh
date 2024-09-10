#!/bin/bash

# Function to kill all background processes
cleanup() {
  echo "Cleaning up..."
  kill $(jobs p)
}

# Trap SIGINT (Ctrl-C) and call the cleanup function
trap cleanup SIGINT

# Start the Go server in the background
echo "Starting Go server..."
air &

# Start Browser-Sync in the background
echo "Starting Browser-Sync..."
browser-sync start \
  --files './**/*.go' \
  --port 3000 \
  --proxy 'localhost:8080' \
  --middleware 'function(req, res, next) { \
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); \
    return next(); \
  }' &

# Wait for all background processes to finish
wait
