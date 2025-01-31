package main

import (
	"fmt"
	"net/http"
)

func main() {
	port := ":8080"
	fmt.Printf("Starting server on %s\n", port)
	http.ListenAndServe(port, SetupRouter())
}
