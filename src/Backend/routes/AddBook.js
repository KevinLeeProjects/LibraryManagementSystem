const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const router = express.Router();

router.post('/', (req, res) => {
    const data = req.body;
    const title = data.title;
    const firstName = data.firstName;
    const middleName = data.middleName;
    const lastName = data.lastName;
    const isbn = data.isbn;
    const copies = data.numberOfCopies;
    const genres = data.genres.split(",");
    const publicationYear = data.publicationYear;

    console.log(genres);
});

module.exports = router;