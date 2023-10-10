const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const client = require('../databasepg.js')
const router = express.Router();


router.post('/', (req, res) => {
    const data = req.body;
    const email = data.email.toLowerCase();
    const isbn = data.isbn;

    //Query to check if book exists
    const queryBook = `
        SELECT *
        FROM books
        WHERE isbn=$1
    `;

    const bookValues = [isbn];
    client.query(queryBook, bookValues, (err, result) => {
        if(!err){
            if(result.rows.length > 0)
            {
                console.log(`ISBN: ${JSON.stringify(result.rows[0])}`);
                //ISBN does exist. Now check if user exists
                const queryUser = `
                    SELECT *
                    FROM users
                    WHERE email=$1
                `;

                const userValue = [email];
                client.query(queryUser, userValue, (error, results) => {
                    if(!error)
                    {
                        console.log(email);
                        if(results.rows.length > 0)
                        {
                            
                        }
                        else
                        {
                            res.status(400).json({error: `User does not exist`});
                        }
                    }
                    else
                    {
                        res.status(400).json({error : error});
                    }
                })
            }
            else
            {
                console.log(`book does not exist`);
                res.status(400).json({error: `ISBN does not exist in database`});
                // //Query for new user
                // const createUser = `
                //     INSERT INTO users(first_name, last_name, email, current_books, all_books)
                //     VALUES($1, $2, $3, $4, $5)
                // `;
                // //Create a new user
                // const newUserValues = [firstName, lastName, email.toLowerCase(), [], []];
                // client.query(createUser, newUserValues, (error, results) => {
                //     if(error)
                //     {
                        
                //         console.log(`error ${error}`);
                //     }
                //     else
                //     {
                //         res.send(`${firstName} added successfully`);
                //         console.log(`results ${results}`);
                //     }
                // });
            }
        }
        else
        {
            console.log(`error ${err}`);
            res.status(400).json({error : err});
        }
    });
});

module.exports = router;