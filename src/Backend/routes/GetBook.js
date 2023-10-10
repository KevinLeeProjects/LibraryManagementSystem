const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const client = require('../databasepg.js')
const router = express.Router();

router.get('/', (req, res) => {
    //Regex to filter ISBN format
    const isbnRegex = /(^\d{3}-\d-\d{5}-\d{3}-\d$)|(^\d-\d{3}-\d{5}-\d$)/;
    const isbnPattern = isbnRegex.test(req.query.data);
    let column = "title";
    
    if(isbnPattern)
    {
        column = "ISBN";
    }
    const data = req.query.data; 

    //Query either ISBN or book title
    const query = {
        text: 'SELECT * FROM books WHERE ' + column + ' = $1',
        values: [data],
    };

     client.query(query, (err, result) => {
        if(!err)
        {
            res.send(result.rows[0]);
        } 
        else
        {
            console.log(err);
            //Check to see if req.query.data is author name
            client.query()
        }
     });
    
    
});

module.exports = router;