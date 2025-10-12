package main

import (
	"backend/api/services"
	"github.com/gin-gonic/gin"
)

func getRoutes() *gin.Engine {
	router := gin.Default()
	router.GET("/book", services.Wip)
	return router
}
