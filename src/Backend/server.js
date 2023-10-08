const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors({origin: `https://library-management-service.onrender.com`}));

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