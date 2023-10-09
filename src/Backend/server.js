import express from 'express';
import path from 'path';
import { json } from 'body-parser';
const app = express();
import cors from 'cors';
const port = 3001;

//For deployment
//app.use(cors({origin: `https://library-management-service.onrender.com`}));
app.use(cors({origin: `http://localhost:3000`}));
app.use(json());

app.use('/', require('./routes/index'));

app.post('/add-book', (req, res) => {
    console.log(JSON.stringify(req.body));
});

const testData = {
    message: `Hello Friend!`
};

app.get('/public', (req,res) => {
    res.json(testData);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});