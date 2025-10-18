package services

import (
	"backend/api/database"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

func GetGenres(c *gin.Context, conn *database.Connector) {
	genres, err := database.GetGenres(conn)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{
		"genres": genres,
	})
}

func GetGenre(c *gin.Context, conn *database.Connector) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	genre, err := database.GetGenreById(conn, id)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{
		"genre": genre,
	})
}

func CreateGenre(c *gin.Context, conn *database.Connector) {
	genre := database.Genre{}
	c.BindJSON(&genre)

	err := database.CreateGenre(conn, &genre)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.IndentedJSON(http.StatusCreated, gin.H{
		"genre": genre,
	})
}

func UpdateGenre(c *gin.Context, conn *database.Connector) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	genre := database.Genre{}
	c.BindJSON(&genre)

	genre.Id = id

	err = database.UpdateGenre(conn, &genre)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{
		"genre": genre,
	})
}

func DeleteGenre(c *gin.Context, conn *database.Connector) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	err = database.DeleteGenre(conn, id)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{
		"message": "Genre deleted",
	})
}
