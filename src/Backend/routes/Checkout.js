const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const client = require('../databasepg.js');
const e = require('express');
const router = express.Router();


function getAuthor(isbn, lastName)
{
    return new Promise((resolve, reject) => {
        const getAuthors = `
            SELECT id FROM authors
            WHERE isbn @> ARRAY[$1] AND last_name = $2
        `;

        const authorValues = [isbn, lastName];
        client.query(getAuthors, authorValues, (err, results) => {
            if (!err) 
            {
                if (results.rows.length > 0) 
                {
                    const id = results.rows[0]["id"];
                    resolve(id);
                } 
                else 
                {
                    //Technically, I should never get errors here because the original router.post should handle mismatched isbn so if the code made it this far, all isbns and respective authors shhould exist
                    console.log('No author found with the given ISBN and last name.');
                    reject(new Error('Author not found'));
                }
            } 
            else 
            {
                console.log(`Get author error: ${err}`);
                reject(err);
            }
        });
    });
}

async function updateAuthorUserHistory(isbn, userId, authorLastName)
{
    try
    {
        let authorId = await getAuthor(isbn, authorLastName);
        const updateUserHistory = `
            UPDATE authors
            SET user_history[$1] = to_jsonb($2::text || user_history[$1])
            WHERE id = $3
        `;

        const authorValues = [userId, isbn, authorId];
        client.query(updateUserHistory, authorValues, (err, result) => {
            if(!err)
            {
                console.log(`${authorLastName}'s newest reader is ${userId} with book ${isbn}`);
            }
            else
            {
                console.log(`${err}`);
            }
        })
    }
    catch (error) 
    {
        console.log(error.message || error);
    }
    
}

function addBooksToUser(id, isbn, bookTitle, userName, res)
{
    const queryCheckout = `
    INSERT INTO all_transactions(isbn, user_id, date_checked_out, date_returned) 
    VALUES($1, $2, $3, $4)
    `;

    const date = new Date(); 
    let year= date.getFullYear(); 
    let month = String(date.getMonth()+1).padStart(2,"0");
    let day= date.getDate(); 
    let currentDate = `${month}/${day}/${year}`;
    const checkoutValues = [isbn, id, currentDate, "N/A"];
    client.query(queryCheckout, checkoutValues, (err, result) => {
        if(!err)
        {
            res.status(201).send(`${bookTitle} checked out to ${userName}`);
        }
        else
        {
            res.status(400).send(`${err}: `)
        }
    });
}


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
                        const authorName = result.rows[0]["author"];
                        const authorSplit = authorName.split(' ');
                        const authorLastName = authorSplit[authorSplit.length - 1];
                        const bookTitle = result.rows[0]["title"];
                        const userName = results.rows[0]["first_name"];
                        let id = results.rows[0]["id"];
                        if(results.rows.length > 0)
                        {
                            updateAuthorUserHistory(isbn, id, authorLastName);
                            addBooksToUser(id, isbn, bookTitle, userName, res);
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