package api

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/shrijan-swaminathan/markbyte/backend/auth"
	"github.com/shrijan-swaminathan/markbyte/backend/db"
	"github.com/shrijan-swaminathan/markbyte/backend/features/markdown_render"
)

const StaticDir = "cmd/static"

// handles upload + conv process
func HandleUpload(w http.ResponseWriter, r *http.Request) {
	// file parse from header

	username, ok := r.Context().Value(auth.UsernameKey).(string)
	if !ok || username == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	file, header, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Failed to read file", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// read md file
	mdContent, err := io.ReadAll(file)
	if err != nil {
		http.Error(w, "Failed to read uploaded file", http.StatusInternalServerError)
		return
	}

	// md -> html, from features/markdown_render/converter.go
	htmlContent, err := markdown_render.ConvertMarkdown(mdContent)
	if err != nil {
		http.Error(w, "Failed to convert markdown", http.StatusInternalServerError)
		return
	}

	// create static dir if not there
	err = os.MkdirAll(StaticDir, os.ModePerm)
	if err != nil {
		http.Error(w, "Failed to create static directory", http.StatusInternalServerError)
		return
	}

	// save html file
	baseFilename := strings.TrimSuffix(header.Filename, ".md")
	outputFilename := fmt.Sprintf("%s.html", baseFilename)
	outputPath := filepath.Join(StaticDir, outputFilename)

	err = os.WriteFile(outputPath, []byte(htmlContent), 0644)
	if err != nil {
		http.Error(w, "Failed to save HTML file", http.StatusInternalServerError)
		return
	}

	existingPosts, err := blogPostDataDB.FetchAllPostVersions(r.Context(), username, baseFilename)
	existingPostsVersions := existingPosts.Versions
	if err != nil {
		http.Error(w, "Failed to fetch existing blog posts", http.StatusInternalServerError)
		return
	}

	newVersion := 1
	for _, post := range existingPostsVersions {
		verNum := 1
		_, err := fmt.Sscanf(post.Version, "%d", &verNum)
		if err != nil {
			http.Error(w, "Failed to parse version number", http.StatusInternalServerError)
			return
		}

		if verNum >= newVersion {
			newVersion = verNum + 1
		}
		if post.IsActive {
			err = blogPostDataDB.UpdateActiveStatus(r.Context(), username, baseFilename, post.Version, false)
			if err != nil {
				http.Error(w, "Failed to deactivate prev post", http.StatusInternalServerError)
				return
			}
		}
	}

	newBlogPostData := db.BlogPostData{
		User:         username,
		Title:        baseFilename,
		DateUploaded: time.Now(),
		Version:      fmt.Sprintf("%d", newVersion),
		IsActive:     true,
	}

	_, err = blogPostDataDB.CreateBlogPost(r.Context(), &newBlogPostData)
	if err != nil {
		http.Error(w, "Failed to save blog post data", http.StatusInternalServerError)
		return
	}

	// header + response
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, `{"message": "File processed successfully", "url": "/static/%s"}`, outputFilename)
}
