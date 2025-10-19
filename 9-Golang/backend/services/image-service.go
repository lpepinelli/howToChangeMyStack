package services

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
	"path/filepath"
)

const imagesDir = "public/images"

func GetImage(c *gin.Context) {
	filename := c.Query("filename")
	if filename == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "filename parameter required"})
		return
	}

	imagePath := filepath.Join(imagesDir, filename)

	if _, err := os.Stat(imagePath); os.IsNotExist(err) {
		c.JSON(http.StatusNotFound, gin.H{"error": "image not found"})
		return
	}

	c.File(imagePath)
}

func SaveImage(c *gin.Context) (string, error) {
	file, err := c.FormFile("image")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "failed to parse form file"})
		return "", err
	}

	if err := os.MkdirAll(imagesDir, 0755); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create images directory"})
		return "", err
	}

	targetPath := filepath.Join(imagesDir, file.Filename)

	if err := c.SaveUploadedFile(file, targetPath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to save image"})
		return "", err
	}

	return file.Filename, nil
}

func DeleteImage(filename string) error {
	imagePath := filepath.Join(imagesDir, filename)

	if _, err := os.Stat(imagePath); os.IsNotExist(err) {
		return nil // File doesn't exist, consider it deleted
	}

	if err := os.Remove(imagePath); err != nil {
		return fmt.Errorf("failed to delete image %s: %w", filename, err)
	}

	return nil
}
