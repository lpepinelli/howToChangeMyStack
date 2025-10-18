package main

import (
	"backend/api/database"
)

func main() {
	db := database.ConnectToDB()
	defer db.Close()
	router := getRoutes(db)

	router.Run("localhost:5002")
}
