package main

import (
	"fmt"
	"net/http"

	"github.com/shrijan-swaminathan/markbyte/backend/server"
)

func main() {
	port := ":8080"
	fmt.Printf("Starting server on %s\n", port)
	http.ListenAndServe(port, server.SetupRouter())
}
