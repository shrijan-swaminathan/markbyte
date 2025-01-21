package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	// Create a new router
	r := chi.NewRouter()

	// Use some common Chi middlewares
	r.Use(middleware.Logger)    // Log all requests
	r.Use(middleware.Recoverer) // Recover from panics

	// Define a simple GET endpoint
	r.Get("/", func(w http.ResponseWriter, req *http.Request) {
		w.WriteHeader(http.StatusOK)
		fmt.Fprintln(w, "Welcome to the Chi server!")
	})

	// Define another GET endpoint with a path parameter
	r.Get("/hello/{name}", func(w http.ResponseWriter, req *http.Request) {
		name := chi.URLParam(req, "name")
		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, "Hello, %s!\n", name)
	})

	// Start the server on port 8080
	log.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", r); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
