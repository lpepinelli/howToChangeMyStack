package services

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"backend/api/database"
)

func GetBooks(c *gin.Context, conn *database.Connector) {
	books, err := database.GetBooks(conn)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{
		"books": books,
	})
}
