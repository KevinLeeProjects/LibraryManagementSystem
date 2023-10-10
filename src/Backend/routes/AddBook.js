const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const client = require('../databasepg.js')
const router = express.Router();


router.post('/', (req, res) => {
    const data = req.body;
    const title = data.title;
    const firstName = data.authorFirstName;
    let middleName = data.authorMiddleName;
    const lastName = data.authorLastName;
    if(middleName == undefined)
    {
        middleName = "";
    }
    const fullName = firstName + " " + middleName + " " + lastName;
    const isbn = data.isbn;
    const copies = data.numberOfCopies;
    const genres = data.genres.split(",");
    const publicationYear = parseInt(data.publicationYear);

    //Query for book
    const insertQuery = `
        INSERT INTO books(ISBN, title, author, genres, publication_year, copies_available, user_history)
        VALUES($1, $2, $3, $4, $5, $6, $7)
    `;

    //Query to check if author exists
    const authorExist = `
        SELECT *
        FROM authors
        WHERE first_name=$1 AND middle_name=$2 AND last_name=$3
    `;

    const authorValues = [firstName, middleName, lastName];
    client.query(authorExist, authorValues, (err, result) => {
        if(!err){
            if(result.rows.length > 0)
            {
                // Row exists, handle it accordingly
                const updateISBN = `
                    UPDATE authors
                    SET isbn = isbn || $1
                    WHERE first_name=$2 AND middle_name=$3 AND last_name=$4
                `;

                const newAuthorValues = [[isbn], firstName, middleName, lastName];
                client.query(updateISBN, newAuthorValues, (error, results) => {
                    if(error)
                    {
                        console.log(`error ${error}`);
                    }
                    else
                    {
                        console.log(`results ${results}`);
                    }
                })

                console.log(`Author already exists: ${JSON.stringify(result.rows[0])}`);
            }
            else
            {
                //Create a new author
                const createAuthor = `
                    INSERT INTO authors(first_name, last_name, isbn, user_history, middle_name)
                    VALUES($1, $2, $3, $4, $5)
                `;
                const newAuthorValues = [firstName, lastName, [isbn], [], middleName];
                client.query(createAuthor, newAuthorValues, (error, results) => {
                    if(error)
                    {
                        console.log(`error ${error}`);
                    }
                    else
                    {
                        console.log(`results ${results}`);
                    }
                });
            }
        }
        else
        {
            console.log(`error ${err}`);
            
        }
    });

    const bookValues = [isbn, title, fullName, genres, publicationYear, copies, []];

    client.query(insertQuery, bookValues, (err, result) =>{
        if(!err){
            res.send(`${title} added successfully`);
        }
        else{
            console.log(err.message);
        }
    });
});

module.exports = router;