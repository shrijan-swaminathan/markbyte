package main

import (
	"fmt"
	"net/http"

	"github.com/shrijan-swaminathan/markbyte/backend/api"
	"github.com/shrijan-swaminathan/markbyte/backend/auth"
	"github.com/shrijan-swaminathan/markbyte/backend/db/mdb"
	"github.com/shrijan-swaminathan/markbyte/backend/server"
)

func main() {
	userDB, err := mdb.NewUserDB("mongodb://localhost:27017", "markbyte", "users")
	if err != nil {
		fmt.Printf("Failed to create userDB: %v\n", err)
	}
	auth.SetUserDB(userDB)

	blogPostDataDB, err := mdb.NewBlogPostDataDB("mongodb://localhost:27017", "markbyte", "blog_post_data")
	if err != nil {
		fmt.Printf("Failed to create blogPostDataDB: %v\n", err)
	}
	api.SetBlogPostDataDB(blogPostDataDB)

	port := ":8080"
	fmt.Printf("Starting server on %s\n", port)
	err = http.ListenAndServe(port, server.SetupRouter())
	if err != nil {
		fmt.Printf("Failed to start server: %v\n", err)
	}
}
