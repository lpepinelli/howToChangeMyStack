package services

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func Wip(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, gin.H{
		"message": "work in progress",
	})
}
