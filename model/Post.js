const client = require('../config/dbconnection');

async function createPost(inputFields, placeHolders, values) {
    try {
        const query = `INSERT INTO POSTS(${inputFields.join(', ')}) VALUES (${placeHolders.join(', ')})`;
        const result = await client.query(query, values);
        return result;
    }
    catch(err) {
        console.log(err);
        throw new Error(err);
    }
}

async function getRecentPost(limit, offset) {
    try {
        const query = `SELECT * FROM POSTS
        ORDER BY CREATED_AT DESC
        LIMIT $1 OFFSET $2`;
        const values = [limit, offset];
        const result = client.query(query, values);
        return result;
    }
    catch(err) {
        console.log(err);
        throw new Error(err);
    }
}

async function getPostById(post_id) {
    try {
        const query = "SELECT * FROM POSTS WHERE id = $1";
        const values = [post_id];
        const result = await client.query(query, values);
        return result; 
    }
    catch(err) {
        console.log(err);
        throw new Error(err);
    }
}

async function updateByPostId(post_id, inputFields, values) {
    try {
        const query = `UPDATE POSTS 
                       SET ${inputFields.join(', ')}, updated_at = CURRENT_TIMESTAMP
                       WHERE id = $${inputFields.length + 1}`;
        const result = await client.query(query, values);
        return result;
    }
    catch(err) {
        console.log(err);
        throw new Error(err);
    }
}

async function deletePostById(post_id) {
    try {
        const query = 'DELETE FROM POSTS WHERE id = $1';
        const values = [post_id];
        const result = await client.query(query, values);
        return result; 
    }
    catch(err) {
        console.log(err);
        throw new Error(err);
    }
}

module.exports = { createPost, getRecentPost, getPostById, updateByPostId, deletePostById };