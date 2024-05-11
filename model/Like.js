const client = require('../config/dbconnection');

async function createLike(post_id, user_id) {
    try {
        const query = 'INSERT INTO LIKES (post_id, user_id) VALUES ($1, $2)';
        const values = [post_id, user_id];
        const result = await client.query(query, values);
        return result;
    }
    catch(err) {
        console.log(err);
        throw new Error(err);
    }
}

async function getLike(post_id, user_id) {
    try {
        const query = 'SELECT * FROM LIKES WHERE post_id = $1 AND user_id = $2';
        const values = [post_id, user_id];
        const result = await client.query(query, values);
        return result;
    }
    catch(err) {
        console.log(err);
        throw new Error(err);
    }
}

async function destroyLike(post_id, user_id) {
    try {
        const query = `DELETE FROM LIKES WHERE post_id = $1 AND user_id = $2`;
        const values = [post_id, user_id];
        const result = await client.query(query, values);
        return result;
    }
    catch(err) {
        console.log(err);
        throw new Error(err);
    }
}

module.exports = { createLike, destroyLike, getLike };