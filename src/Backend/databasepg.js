const {Client} = require('pg');
require('dotenv').config();

//Database login
// const client = new Client({
//     host: "localhost",
//     user: "postgres",
//     port: 5432,
//     password: process.env.DB_PASSWORD,
//     database: "postgres"
// });

const client = new Client({
  host: "dpg-ckittea12bvs73dsf680-a.oregon-postgres.render.com",
  user: "librarymanagementsystem_2jb4_user",
  port: 5432,
  password: process.env.DB_PASSWORD,
  database: "librarymanagementsystem_2jb4"
});

client.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + client.threadId);
});

module.exports = client;