package database

type Genre struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
}

func GetGenres(conn *Connector) ([]Genre, error) {
	genres := []Genre{}
	rows, err := conn.db.Query("SELECT * FROM Genre")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var genre Genre
		err = rows.Scan(&genre.Id, &genre.Name)
		if err != nil {
			return nil, err
		}
		genres = append(genres, genre)
	}
	return genres, nil
}

func GetGenreById(conn *Connector, id int) (Genre, error) {
	var genre Genre

	err := conn.db.QueryRow("SELECT * FROM Genre WHERE id = ?", id).Scan(&genre.Id, &genre.Name)
	if err != nil {
		return genre, err
	}

	return genre, nil
}

func CreateGenre(conn *Connector, genre *Genre) error {

	_, err := conn.db.Exec("INSERT INTO Genre (name) VALUES (?)", genre.Name)
	if err != nil {
		return err
	}

	return nil
}

func UpdateGenre(conn *Connector, genre *Genre) error {
	_, err := conn.db.Exec("UPDATE Genre SET name = ? WHERE id = ?", genre.Name, genre.Id)
	if err != nil {
		return err
	}

	return nil
}

func DeleteGenre(conn *Connector, id int) error {
	_, err := conn.db.Exec("DELETE FROM Genre WHERE id = ?", id)
	if err != nil {
		return err
	}
	return nil
}
