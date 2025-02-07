package db

import "context"

type User struct {
	Username string `json:"username" bson:"username"`
	Password string `json:"password" bson:"password"`
}

type UserDB interface {
	CreateUser(ctx context.Context, user *User) (string, error)
	GetUser(ctx context.Context, username string) (*User, error)
	RemoveUser(ctx context.Context, username string) error
}
