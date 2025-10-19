package main

import (
	"backend/api/database"
)

func main() {
	db := database.ConnectToDB()
	defer db.Close()
	router := getRoutes(db)

	// Use HTTPS for local development
	router.RunTLS(":5002", "cert.pem", "key.pem")
	// router.Run("localhost:5002")
}
