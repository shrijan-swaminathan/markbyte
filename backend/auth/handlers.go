package auth

import (
	"encoding/json"
	"log"
	"net/http"
	"sync"

	"github.com/shrijan-swaminathan/markbyte/backend/db"
)

var mu sync.Mutex

type UserRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func HandleSignup(w http.ResponseWriter, r *http.Request) {
	// Parse the request body
	var usrReq UserRequest
	err := json.NewDecoder(r.Body).Decode(&usrReq)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	existingUser, err := userDB.GetUser(r.Context(), usrReq.Username)
	if err == nil && existingUser != nil {
		http.Error(w, "User already exists", http.StatusBadRequest)
		return
	}

	log.Printf("Creating user: %s\n", usrReq.Username)

	hashedPassword, err := HashPassword(usrReq.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	newUser := &db.User{
		Username: usrReq.Username,
		Password: hashedPassword,
	}

	_, err = userDB.CreateUser(r.Context(), newUser)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "User created successfully"})
}

func HandleLogin(w http.ResponseWriter, r *http.Request) {
	var usrReq UserRequest
	err := json.NewDecoder(r.Body).Decode(&usrReq)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	user, err := userDB.GetUser(r.Context(), usrReq.Username)
	if err != nil || user == nil {
		http.Error(w, err.Error(), http.StatusUnauthorized)
		return
	}

	if !VerifyPassword(user.Password, usrReq.Password) {
		http.Error(w, "Unauthorized, Username/Password don't match", http.StatusUnauthorized)
		return
	}

	token, err := GenerateJWT(user.Username)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{"token": token})
}
