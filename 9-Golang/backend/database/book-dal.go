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
	Genre       int            `json:"genre"`
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
	rows, err := conn.db.Query("SELECT * FROM Book")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var book Book
		err = rows.Scan(&book.Id, &book.Title, &book.Author, &book.Cover, &book.Genre, &book.Isbn, &book.Publication)
		if err != nil {
			return nil, err
		}
		books = append(books, book)
	}
	return books, nil
}

func GetBookById(conn *Connector, id int) (Book, error) {
	var book Book

	err := conn.db.QueryRow("SELECT * FROM Book WHERE id = ?", id).Scan(&book.Id, &book.Title, &book.Author, &book.Cover, &book.Genre, &book.Isbn, &book.Publication)
	if err != nil {
		return book, err
	}

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
