-- Drop existing tables if they exist
DROP TABLE IF EXISTS Book;
DROP TABLE IF EXISTS Genre;

-- Genre table
CREATE TABLE Genre (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Book table
CREATE TABLE Book (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    cover VARCHAR(255), -- path or URL to the cover image
    genre_id INT,
    isbn VARCHAR(20),
    publication DATE,
    FOREIGN KEY (genre_id) REFERENCES Genre(id)
);

-- Insert sample genres
INSERT INTO Genre (name)
VALUES
    ('Jazz Biography'),
    ('Science Fiction'),
    ('Fantasy');

-- Insert sample books
INSERT INTO Book (title, author, cover, genre_id, isbn, publication)
VALUES
    ('Blue Train: The Story of John Coltrane', 'John Doe', 'covers/bluetrain.jpg', 1, '9781234567890', '1957-09-15'),
    ('The Wind Planet', 'Luna Perez', 'covers/windplanet.jpg', 2, '9780987654321', '2020-04-23');
