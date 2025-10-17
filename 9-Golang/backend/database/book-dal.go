package database

type Book struct {
	Id        int
	Title     string
	Author    string
	Cover     string
	Genre     int
	Isbn      string
	Publication string
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

func GetBookById(conn *Connector, id int) Book {
	var book Book

	err := conn.db.QueryRow("SELECT * FROM Book WHERE id = ?", id).Scan(&book.Id, &book.Title, &book.Author, &book.Cover, &book.Genre, &book.Isbn, &book.Publication)
	if err != nil {
		panic(err)
	}

	return book
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
