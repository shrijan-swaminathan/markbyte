package main

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"

	"github.com/shrijan-swaminathan/markbyte/backend/api"
)

func SetupRouter() *chi.Mux {
	r := chi.NewRouter()

	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Post("/upload", api.HandleUpload)
	r.Get("/static/*", api.HandleStatic)

	return r
}
