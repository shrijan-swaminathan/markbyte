package api

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/shrijan-swaminathan/markbyte/backend/features/markdown_render"
)

const StaticDir = "cmd/static"

// handles upload + conv process
func HandleUpload(w http.ResponseWriter, r *http.Request) {
	// file parse from header
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

	// header + response
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, `{"message": "File processed successfully", "url": "/static/%s"}`, outputFilename)
}
