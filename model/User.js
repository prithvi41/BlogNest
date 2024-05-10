const client = require('../config/dbconnection');
const http_status_code = require('../config/httpstatuscode');

async function createUser(data) {
    try {
        const query = 'INSERT INTO USERS (user_name, email, password) VALUES ($1, $2, $3)';
        const values = [data.username, data.email, data.password];
        const result = await client.query(query, values);
        return result;
    }
    catch(err) {
        console.log(err);
        return res.status(http_status_code.INTERNAL_SERVER_ERROR).send("error while executing query");
    }
}

async function getUserByName(username) {
    try {
        const query = 'SELECT * FROM USERS WHERE user_name = $1';
        const values = [username];
        const result = await client.query(query, values);
        return result;
    }
    catch(err) {
        console.log(err);
        return res.status(http_status_code.INTERNAL_SERVER_ERROR).send("unexpected server error");
    }
}

module.exports = { createUser, getUserByName };