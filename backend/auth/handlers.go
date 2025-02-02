package auth

import (
	"encoding/json"
	"net/http"
	"sync"
)

var mu sync.Mutex

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func HandleSignup(w http.ResponseWriter, r *http.Request) {
	// Parse the request body
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	mu.Lock()
	defer mu.Unlock()

	_, exists := users[user.Username]

	if exists {
		http.Error(w, "User already exists", http.StatusBadRequest)
		return
	}

	hashedPassword, err := HashPassword(user.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	users[user.Username] = hashedPassword
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "User created successfully"})
}

func HandleLogin(w http.ResponseWriter, r *http.Request) {
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	mu.Lock()
	storedHashedPassword, exists := users[user.Username]
	mu.Unlock()

	if !exists {
		http.Error(w, "User does not exist", http.StatusUnauthorized)
		return
	}

	if !VerifyPassword(storedHashedPassword, user.Password) {
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
