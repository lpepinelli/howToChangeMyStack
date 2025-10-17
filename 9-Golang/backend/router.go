package main

import (
	"backend/api/services"
	"github.com/gin-gonic/gin"
	"backend/api/database"
)

func getRoutes(conn *database.Connector) *gin.Engine {
	router := gin.Default()
	router.GET("/book", func(c *gin.Context) {
		services.GetBooks(c, conn)
	})
	return router
}
