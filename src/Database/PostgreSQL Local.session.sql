CREATE TABLE users (
    ID INT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    current_books JSON,
    all_books JSON
);

CREATE TABLE books (
    ISBN VARCHAR(17) NOT NULL UNIQUE,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    genres TEXT [] NOT NULL,
    publication_year INT NOT NULL,
    copies_available INT NOT NULL,
    user_history JSON
);

CREATE TABLE authors (
    ID INT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
	middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    ISBN INT [] NOT NULL,
    user_history JSON
);

CREATE TABLE genres (
    genres TEXT []
);

CREATE TABLE all_transactions (
    ISBN INT,
    user_id INT,
    date_checked_out VARCHAR(10),
    date_returned VARCHAR(10)
);