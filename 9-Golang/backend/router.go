package main

import (
	"backend/api/database"
	"backend/api/services"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"net/http"
)

func getRoutes(conn *database.Connector) *gin.Engine {
	router := gin.Default()

	// CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE"}
	config.AllowHeaders = []string{"Content-Type", "Authorization"}
	router.Use(cors.New(config))

	api := router.Group("/api")

	// Book
	api.GET("/book", func(c *gin.Context) {
		services.GetBooks(c, conn)
	})
	api.GET("/book/:id", func(c *gin.Context) {
		services.GetBook(c, conn)
	})
	api.POST("/book", func(c *gin.Context) {
		services.CreateBook(c, conn)
	})
	api.PUT("/book/:id", func(c *gin.Context) {
		services.UpdateBook(c, conn)
	})
	api.DELETE("/book/:id", func(c *gin.Context) {
		services.DeleteBook(c, conn)
	})

	// Genre
	api.GET("/genre", func(c *gin.Context) {
		services.GetGenres(c, conn)
	})
	api.GET("/genre/:id", func(c *gin.Context) {
		services.GetGenre(c, conn)
	})
	api.POST("/genre", func(c *gin.Context) {
		services.CreateGenre(c, conn)
	})
	api.PUT("/genre/:id", func(c *gin.Context) {
		services.UpdateGenre(c, conn)
	})
	api.DELETE("/genre/:id", func(c *gin.Context) {
		services.DeleteGenre(c, conn)
	})

	// Image
	api.GET("/book/getImage", func(c *gin.Context) {
		services.GetImage(c)
	})

	api.POST("/book/image", func(c *gin.Context) {
		c.IndentedJSON(http.StatusBadRequest, gin.H{
			"message": "Not implemented",
		})
	})

	api.PUT("/book/image/:previousImage", func(c *gin.Context) {
		c.IndentedJSON(http.StatusBadRequest, gin.H{
			"message": "Not implemented",
		})
	})

	return router
}
