const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const client = require('../databasepg.js')
const router = express.Router();

router.post('/', (req, res) => {
    const data = req.body;
    const title = data.title;
    const firstName = data.firstName;
    const middleName = data.middleName;
    const lastName = data.lastName;
    const fullName = firstName + " " + middleName + " " + lastName;
    const isbn = data.isbn;
    const copies = data.numberOfCopies;
    const genres = data.genres.split(",");
    const publicationYear = parseInt(data.publicationYear);

    const insertQuery = `
        INSERT INTO books(ISBN, title, author, genres, publication_year, copies_available, user_history)
        VALUES($1, $2, $3, $4, $5, $6, $7)
    `;

    const values = [isbn, title, fullName, genres, publicationYear, copies, []];

    client.query(insertQuery, values, (err, result) =>{
        if(!err){
            res.send(`${title} added successfully`);
        }
        else{
            console.log(err.message);
        }
        client.end();
    });
    
    //console.log(genres);
});

module.exports = router;