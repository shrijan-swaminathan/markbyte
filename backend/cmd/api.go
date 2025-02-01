package main

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/jwtauth/v5"
	"github.com/shrijan-swaminathan/markbyte/backend/api"
	"github.com/shrijan-swaminathan/markbyte/backend/auth"
)

func SetupRouter() *chi.Mux {
	r := chi.NewRouter()

	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Post("/signup", auth.HandleSignup)
	r.Post("/login", auth.HandleLogin)

	// Protected routes
	r.Group(func(protected chi.Router) {
		protected.Use(jwtauth.Verifier(auth.TokenAuth))
		protected.Use(jwtauth.Authenticator(auth.TokenAuth))
		protected.Use(auth.JWTAuthMiddleware)

		protected.Post("/upload", api.HandleUpload)

	})

	r.Get("/static/*", api.HandleStatic)

	return r
}
