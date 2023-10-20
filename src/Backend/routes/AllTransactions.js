const express = require('express');
const client = require('../databasepg.js')
const router = express.Router();

router.get('/', (req, res) => {
    //Query either ISBN or book title
    const query = `
        SELECT * FROM all_transactions
    `;

     client.query(query, (err, result) => {
        if(!err)
        {
            console.log(result.rows);
            res.send(result.rows);
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