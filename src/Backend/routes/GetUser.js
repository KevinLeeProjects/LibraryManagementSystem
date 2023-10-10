const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const client = require('../databasepg.js')
const router = express.Router();

router.get('/', (req, res) => {
    const email = req.query.email.toLowerCase(); 

    //Query user by email
    const query = {
        text: 'SELECT * FROM users WHERE email=$1',
        values: [email],
    };

     client.query(query, (err, result) => {
        if(!err)
        {
            res.send(result.rows[0]);
        } 
        else
        {
            console.log(err);
        }
     });
    
    
});

module.exports = router;