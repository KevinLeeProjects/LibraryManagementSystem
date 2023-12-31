const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;
require('dotenv').config();

//For deployment
//app.use(cors({origin: `https://library-management-system-react.onrender.com`}));

//For test
app.use(cors({origin: `http://localhost:3000`}));

app.use(bodyParser.json());

//Test
app.use('/', require('./routes/index'));

//Route to add a new book
app.use('/add-book', require('./routes/AddBook'));

//Get specific book
app.use('/get-book', require('./routes/GetBook'));

//Add a new user
app.use('/add-user', require('./routes/AddUser'));

//Get a user
app.use('/get-user', require('./routes/GetUser'));

//Checkout a book to a user
app.use('/checkout', require('./routes/Checkout'));

//All transactions
app.use('/all-transactions', require('./routes/AllTransactions'));
//More tests
// const testData = {
//     message: `Hello Friend!`
// };
// app.get('/public', (req,res) => {
//     res.json(testData);
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});