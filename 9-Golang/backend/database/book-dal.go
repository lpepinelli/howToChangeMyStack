package database

import (
	"database/sql"
	"encoding/json"
)

type Book struct {
	Id          int            `json:"id"`
	Title       string         `json:"title"`
	Author      string         `json:"author"`
	Cover       sql.NullString `json:"-"`
	Genre       Genre          `json:"genre"`
	Isbn        string         `json:"isbn"`
	Publication string         `json:"publication"`
}

func (b Book) MarshalJSON() ([]byte, error) {
	type Alias Book
	return json.Marshal(&struct {
		*Alias
		Cover *string `json:"cover"`
	}{
		Cover: func() *string {
			if b.Cover.Valid {
				return &b.Cover.String
			}
			return nil
		}(),
		Alias: (*Alias)(&b),
	})
}

func GetBooks(conn *Connector) ([]Book, error) {
	books := []Book{}
	rows, err := conn.db.Query(`
		SELECT Book.id, Book.title, Book.author, Book.cover, Book.genre_id, Genre.name AS genre_name, Book.isbn, Book.publication
		FROM Book
		LEFT JOIN Genre ON Book.genre_id = Genre.id
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var book Book
		var genreId int
		var genreName string

		err = rows.Scan(&book.Id, &book.Title, &book.Author, &book.Cover, &genreId, &genreName, &book.Isbn, &book.Publication)
		if err != nil {
			return nil, err
		}
		book.Genre = Genre{Id: genreId, Name: genreName}
		books = append(books, book)
	}
	return books, nil
}

func GetBookById(conn *Connector, id int) (Book, error) {
	var book Book
	var genreId int
	var genreName string

	err := conn.db.QueryRow(`
		SELECT Book.id, Book.title, Book.author, Book.cover, Book.genre_id, Genre.name AS genre_name, Book.isbn, Book.publication
		FROM Book
		LEFT JOIN Genre ON Book.genre_id = Genre.id
		WHERE Book.id = ?
	`, id).Scan(&book.Id, &book.Title, &book.Author, &book.Cover, &genreId, &genreName, &book.Isbn, &book.Publication)
	if err != nil {
		return book, err
	}
	book.Genre = Genre{Id: genreId, Name: genreName}

	return book, nil
}

func CreateBook(conn *Connector, book *Book) error {

	_, err := conn.db.Exec("INSERT INTO Book (title, author, genre_id, isbn, publication) VALUES (?, ?, ?, ?, ?)", book.Title, book.Author, book.Genre, book.Isbn, book.Publication)
	if err != nil {
		return err
	}

	return nil
}

func UpdateBook(conn *Connector, book *Book) error {
	_, err := conn.db.Exec("UPDATE Book SET title = ?, author = ?, genre_id = ?, isbn = ?, publication = ? WHERE id = ?", book.Title, book.Author, book.Genre, book.Isbn, book.Publication, book.Id)
	if err != nil {
		return err
	}

	return nil
}

func DeleteBook(conn *Connector, id int) error {
	_, err := conn.db.Exec("DELETE FROM Book WHERE id = ?", id)
	if err != nil {
		return err
	}

	return nil
}

func UpdateBookCover(conn *Connector, oldCover, newCover string) error {
	_, err := conn.db.Exec("UPDATE Book SET cover = ? WHERE cover = ?", newCover, oldCover)
	if err != nil {
		return err
	}

	return nil
}
