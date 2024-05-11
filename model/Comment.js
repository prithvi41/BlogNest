const client = require('../config/dbconnection');
const postModel = require('../model/Post');

async function createComment(comment_text, post_id, user_id) {
    try {
        const query = 'INSERT INTO COMMENTS (comment_text, post_id, user_id) VALUES ($1, $2, $3)';
        const values = [comment_text, post_id, user_id];
        const result = await client.query(query, values);
        return result;
    }
    catch(err) {
        console.log(err);
        throw new Error(err);
    }
}

async function getComment(comment_id, post_id, user_id) {
    try {
        const query = 'SELECT * FROM COMMENTS WHERE id = $1 AND post_id = $2 AND user_id = $3';
        const values = [comment_id, post_id, user_id];
        const result = await client.query(query, values);
        return result;
    }
    catch(err) {
        console.log(err);
        throw new Error(err);
    }
}

async function destroyComment(comment_id, post_id, user_id) {
    try {
        const query = `DELETE FROM COMMENTS WHERE id = $1 AND post_id = $2 AND user_id = $3`;
        const values = [comment_id, post_id, user_id];
        const result = await client.query(query, values);
        return result;
    }
    catch(err) {
        console.log(err);
        throw new Error(err);
    }
}

// adding two db queries inside acid transactions
async function addCommentAndIncreaseCount(comment_text, post_id, user_id) {
    try {
        await client.query('BEGIN');
        await createComment(comment_text, post_id, user_id);
        await postModel.increaseCommentsCount(post_id);
        await client.query('COMMIT');
    }
    catch(err) {
        console.log(err);
        await client.query('ROLLBACK');
        throw new Error(err);
    }
}

async function removeCommentAndDecreaseCount(comment_id, post_id, user_id) {
    try {
        await client.query('BEGIN');
        await destroyComment(comment_id, post_id, user_id);
        await postModel.decreaseCommentsCount(post_id);
        await client.query('COMMIT');
    }
    catch(err) {
        console.log(err);
        await client.query('ROLLBACK');
        throw new Error(err);
    }
}

module.exports = { createComment, destroyComment, getComment, addCommentAndIncreaseCount, removeCommentAndDecreaseCount };