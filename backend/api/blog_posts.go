package api

import (
	"encoding/json"
	"net/http"

	"github.com/shrijan-swaminathan/markbyte/backend/auth"
	"github.com/shrijan-swaminathan/markbyte/backend/db"
)

var blogPostDataDB db.BlogPostDataDB

func SetBlogPostDataDB(repo db.BlogPostDataDB) {
	blogPostDataDB = repo
}

func HandleFetchAllBlogPosts(w http.ResponseWriter, r *http.Request) {
	username, ok := r.Context().Value(auth.UsernameKey).(string)
	if !ok || username == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	blogs, err := blogPostDataDB.FetchAllUserBlogPosts(r.Context(), username)
	if err != nil {
		http.Error(w, "Failed to fetch blog posts", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(blogs)
	if err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}
