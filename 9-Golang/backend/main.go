package main

import (
	"backend/api/database"
)

func main() {
	db := database.ConnectToDB()
	defer db.Close()
	router := getRoutes()

	router.Run("localhost:5002")
}

// a router file
// a services directory
// book-service.go
// genre-service.go
// a controller directory?
// a database directory
// mysql-persistence.go
// book-dal.go
// genre-dal.go
