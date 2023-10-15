
CREATE TABLE Genre (
                gr_id INT AUTO_INCREMENT NOT NULL,
                name VARCHAR(60) NOT NULL,
                PRIMARY KEY (gr_id)
);


CREATE TABLE Book (
                bk_id INT AUTO_INCREMENT NOT NULL,
                title VARCHAR(60) NOT NULL,
                author VARCHAR(60) NOT NULL,
                cover VARCHAR(120),
                gr_id INT NOT NULL,
                isbn VARCHAR(30),
                publication DATE NOT NULL,
                PRIMARY KEY (bk_id)
);


ALTER TABLE Book ADD CONSTRAINT genre_book_fk
FOREIGN KEY (gr_id)
REFERENCES Genre (gr_id)
ON DELETE NO ACTION
ON UPDATE NO ACTION;