const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const client = require('../databasepg.js')
const router = express.Router();

router.get('/', (req, res) => {
    
    const getQuery = `SELECT * FROM BOOK`;
});