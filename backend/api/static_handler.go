package api

import (
	"net/http"
)

const staticDir = "cmd/static"

func HandleStatic(w http.ResponseWriter, r *http.Request) {
	fileServer := http.StripPrefix("/static/", http.FileServer(http.Dir(staticDir)))
	fileServer.ServeHTTP(w, r)
}
