package database

import (
	"database/sql"
	"fmt"
	"github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"os"
)

type Connector struct {
	db *sql.DB
}

func getMysqlConnectionString() string {
	config := mysql.NewConfig()
	config.User = os.Getenv("DBUSER")
	config.Passwd = os.Getenv("DBPASS")
	config.Net = "tcp"
	config.Addr = "127.0.0.1:3306"
	config.DBName = "recordings"

	return config.FormatDSN()
}

func ConnectToDB() *Connector {
	err := godotenv.Load()
	if err != nil {
		panic(err)
	}

	db, err := sql.Open("mysql", getMysqlConnectionString())
	if err != nil {
		panic(err)
	}

	pingErr := db.Ping()
	if pingErr != nil {
		panic(pingErr)
	}

	fmt.Println("Connected to database!")

	return &Connector{db}
}

func (conn *Connector) Select(query string, args ...interface{}) ([]map[string]interface{}, error) {
	rows, err := conn.db.Query(query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var results []map[string]interface{}
	for rows.Next() {
		result := make(map[string]interface{})
		err = rows.Scan(result)
		if err != nil {
			return nil, err
		}
		results = append(results, result)
	}

	return results, nil
}

func (conn *Connector) Execute(query string, args ...interface{}) (sql.Result, error) {
	result, err := conn.db.Exec(query, args...)
	if err != nil {
		return nil, err
	}
	return result, nil
}

func (conn *Connector) Close() {
	conn.db.Close()
}
