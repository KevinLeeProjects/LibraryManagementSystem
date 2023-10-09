const {Client} = require('pg');

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Awesomebipo69!",
    database: "postgres"
});

client.connect();

client.query(`Select * from users`, (error, res) =>{
    if(!error)
    {
        console.log(res.rows);
    }
    else
    {
        console.log(error.message);
    }
    client.end();
});