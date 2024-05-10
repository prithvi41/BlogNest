const { Client } = require('pg');
require('dotenv').config();

const client = new Client ({
    host : process.env.PGHOST,
    port : process.env.PGPORT,
    user : process.env.PGUSER,
    database : process.env.PGDB
});

client.connect((err) => {
    if(err) {
        console.log(err);
        return new Error ("Unable to connect to the database");
    }
    console.log("db connected ");
});

module.exports = client;
