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

async function getPostFiltered(user_id, topics) {
    try {
        const query = `SELECT * FROM POSTS WHERE
                        ${user_id !== null ? `user_id = $1` : ''}
                        ${user_id !== null && topics.length > 0 ? `AND` : ''}
                        ${topics && topics.length > 0 ? topics.map((key, index) => `topic like $${ index + 2 }`).join(' OR '): ''}`;
        const values = [];
        if(user_id != null) {
            values.push(user_id);
        }
        if(topics && topics.length > 0) {
            values.push(...topics.map((key) => `%${key}%`));
        }
        const result = await client.query(query, values);
        return result;
    }
    catch(err) {
        console.log(err);
        throw new Error(err);
    }
}

async function increaseLikesCount(post_id) {
    try {
        const query = `UPDATE POSTS
                       SET likes_count = COALESCE(likes_count, 0) + 1
                       WHERE id = $1`
        const values = [post_id];
        const result = await client.query(query, values);
        return result; 
    }
    catch(err) {
        console.log(err);
        throw new Error(err);
    }
}

async function decreaseLikesCount(post_id) {
    try {
        const query = `UPDATE POSTS 
                       SET likes_count = CASE 
                                            WHEN likes_count > 0 THEN likes_count - 1
                                            ELSE 0
                                        END
                       WHERE id = $1`;
        const values = [post_id];
        const result = await client.query(query, values);
        return result;
    }
    catch(err) {
        console.log(err);
        throw new Error(err);
    }
}

async function increaseCommentsCount(post_id) {
    try {
        const query = `UPDATE POSTS
                       SET comments_count = COALESCE(comments_count, 0) + 1
                       WHERE id = $1`
        const values = [post_id];
        const result = await client.query(query, values);
        return result; 
    }
    catch(err) {
        console.log(err);
        throw new Error(err);
    }
}

async function decreaseCommentsCount(post_id) {
    try {
        const query = `UPDATE POSTS 
                       SET comments_count = CASE 
                                            WHEN comments_count > 0 THEN comments_count - 1
                                            ELSE 0
                                        END
                       WHERE id = $1`;
        const values = [post_id];
        const result = await client.query(query, values);
        return result;
    }
    catch(err) {
        console.log(err);
        throw new Error(err);
    }
}

module.exports = { createPost, getRecentPost, getPostById, updateByPostId, deletePostById, getPostFiltered, increaseLikesCount,
                    decreaseLikesCount, increaseCommentsCount, decreaseCommentsCount };