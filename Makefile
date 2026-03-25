# jbhicks.dev Makefile
.PHONY: all build run test clean fmt vet lint deps dev install help docker-build docker-run

# Variables
BINARY_NAME=jbhicks.dev
BUILD_DIR=./build
MAIN_FILE=main.go
GO=go
PORT=3000

# Default target
all: build

## build: Build the binary
build:
	@echo "Building $(BINARY_NAME)..."
	@mkdir -p $(BUILD_DIR)
	$(GO) build -o $(BUILD_DIR)/$(BINARY_NAME) $(MAIN_FILE)
	@echo "Build complete: $(BUILD_DIR)/$(BINARY_NAME)"

## run: Run the application (builds first)
run: build
	@echo "Starting server on port $(PORT)..."
	./$(BUILD_DIR)/$(BINARY_NAME)

## dev: Run with live reload (requires air)
dev:
	@if command -v air >/dev/null 2>&1; then \
		air; \
	else \
		echo "air not installed. Install with:"; \
		echo "  go install github.com/cosmtrek/air@latest"; \
		exit 1; \
fi

## test: Run all tests
test:
	@echo "Running tests..."
	$(GO) test -v ./...

## test-coverage: Run tests with coverage report
test-coverage:
	@echo "Running tests with coverage..."
	$(GO) test -coverprofile=coverage.out ./...
	$(GO) tool cover -html=coverage.out -o coverage.html
	@echo "Coverage report generated: coverage.html"

## clean: Remove build artifacts
clean:
	@echo "Cleaning..."
	@rm -rf $(BUILD_DIR)
	@rm -f coverage.out coverage.html
	@echo "Clean complete"

## deps: Download and verify dependencies
deps:
	@echo "Downloading dependencies..."
	$(GO) mod download
	$(GO) mod verify

## tidy: Tidy and verify go.mod
tidy:
	@echo "Tidying go.mod..."
	$(GO) mod tidy

## fmt: Format all Go files
fmt:
	@echo "Formatting code..."
	$(GO) fmt ./...

## vet: Run go vet
vet:
	@echo "Running go vet..."
	$(GO) vet ./...

## lint: Run linter (requires golangci-lint)
lint:
	@echo "Running linter..."
	@if command -v golangci-lint >/dev/null 2>&1; then \
		golangci-lint run; \
	else \
		echo "golangci-lint not installed. Install with:"; \
		echo "  go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest"; \
		exit 1; \
	fi

## check: Run fmt, vet, and test
check: fmt vet test
	@echo "All checks passed!"

## install: Install the binary to GOPATH/bin
install: build
	@echo "Installing $(BINARY_NAME) to $(GOPATH)/bin..."
	$(GO) install

## update: Update all dependencies to latest versions
update:
	@echo "Updating dependencies..."
	$(GO) get -u ./...
	$(GO) mod tidy

## docker-build: Build Docker image
docker-build:
	@echo "Building Docker image..."
	docker build -t $(BINARY_NAME):latest .

## docker-run: Run Docker container
docker-run:
	@echo "Running Docker container..."
	docker run -p $(PORT):$(PORT) $(BINARY_NAME):latest

## help: Show this help message
help:
	@echo "Available targets:"
	@grep -E '^##' $(MAKEFILE_LIST) | sed 's/## /  /'

# Prevent make from trying to remake the Makefile
Makefile: ;
