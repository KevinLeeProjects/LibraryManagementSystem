const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const port = 3001;

app.use(cors({origin: `http://localhost:3000`}));

app.use('/', require('./routes/index'));

const testData = {
    message: `Hello Friend!`
};

app.get('/public', (req,res) => {
    res.json(testData);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});