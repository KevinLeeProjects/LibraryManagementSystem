const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const client = require('../databasepg.js')
const router = express.Router();


router.post('/', (req, res) => {
    const data = req.body;
    const email = data.email;
    const firstName = data.firstName;
    const lastName = data.lastName;

    //Query to check if user exists
    const userExist = `
        SELECT *
        FROM users
        WHERE email=$1
    `;

    const userValues = [email];
    client.query(userExist, userValues, (err, result) => {
        if(!err){
            if(result.rows.length > 0)
            {
                console.log(`User already exists: ${JSON.stringify(result.rows[0])}`);
                res.status(400).send(`User already exists`);
            }
            else
            {
                 //Query for new user
                const createUser = `
                    INSERT INTO users(first_name, last_name, email, current_books, all_books)
                    VALUES($1, $2, $3, $4, $5)
                `;
                //Create a new user
                const newUserValues = [firstName, lastName, email.toLowerCase(), [], []];
                client.query(createUser, newUserValues, (error, results) => {
                    if(error)
                    {
                        res.status(400).send(error);
                        console.log(`error ${error}`);
                    }
                    else
                    {
                        res.status(201).send(`${firstName} added successfully`);
                        console.log(`results ${results}`);
                    }
                });
            }
        }
        else
        {
            res.status(400).send(err);
            console.log(`error ${err}`);
            
        }
    });
});

module.exports = router;