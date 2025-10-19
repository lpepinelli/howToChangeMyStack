package services

import (
	"backend/api/database"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
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

func GetBook(c *gin.Context, conn *database.Connector) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	book, err := database.GetBookById(conn, id)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{
		"book": book,
	})
}

func CreateBook(c *gin.Context, conn *database.Connector) {
	book := database.Book{}
	c.BindJSON(&book)

	err := database.CreateBook(conn, &book)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.IndentedJSON(http.StatusCreated, gin.H{
		"book": book,
	})
}

func UpdateBook(c *gin.Context, conn *database.Connector) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	book := database.Book{}
	c.BindJSON(&book)

	book.Id = id

	err = database.UpdateBook(conn, &book)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{
		"book": book,
	})
}

func DeleteBook(c *gin.Context, conn *database.Connector) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
		})
		return
	}

	err = database.DeleteBook(conn, id)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
		})
		return
	}

	c.IndentedJSON(http.StatusOK, gin.H{
		"message": "Book deleted",
	})
}
