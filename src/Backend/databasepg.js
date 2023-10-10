const {Client} = require('pg');
require('dotenv').config();

//Database login
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: process.env.DB_PASSWORD,
    database: "postgres"
});

client.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + client.threadId);
});

module.exports = client;