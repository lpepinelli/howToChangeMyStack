package main

import (
	"backend/api/database"
	"backend/api/services"
	"github.com/gin-gonic/gin"
)

func getRoutes(conn *database.Connector) *gin.Engine {
	router := gin.Default()

	// Book
	router.GET("/book", func(c *gin.Context) {
		services.GetBooks(c, conn)
	})
	router.GET("/book/:id", func(c *gin.Context) {
		services.GetBook(c, conn)
	})
	router.POST("/book", func(c *gin.Context) {
		services.CreateBook(c, conn)
	})
	router.PUT("/book/:id", func(c *gin.Context) {
		services.UpdateBook(c, conn)
	})
	router.DELETE("/book/:id", func(c *gin.Context) {
		services.DeleteBook(c, conn)
	})

	// Genre
	router.GET("/genre", func(c *gin.Context) {
		services.GetGenres(c, conn)
	})
	router.GET("/genre/:id", func(c *gin.Context) {
		services.GetGenre(c, conn)
	})
	router.POST("/genre", func(c *gin.Context) {
		services.CreateGenre(c, conn)
	})
	router.PUT("/genre/:id", func(c *gin.Context) {
		services.UpdateGenre(c, conn)
	})
	router.DELETE("/genre/:id", func(c *gin.Context) {
		services.DeleteGenre(c, conn)
	})
	return router
}
