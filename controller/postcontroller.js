const postModel = require('../model/Post');
const http_status_code = require('../config/httpstatuscode');

// create a new post
async function newPost(req, res) {
    try {
        const data = {
            ...req.body,
            user_id : req.user.userId
        };
        if(!data.title || !data.description) {
            return res.status(http_status_code.BAD_REQUEST).send("missing required fields");
        }
        const inputFields = Object.keys(data).filter((key) => (data[key] !== null || data[key] !== undefined));
        const placeHolders = inputFields.map((key, idx) => `$${idx + 1}`);
        const values = inputFields.map((key) => data[key]);
        await postModel.createPost(inputFields, placeHolders, values);
        return res.status(http_status_code.CREATED).send("post created successfully");
    }
    catch(err) {
        console.log(err);
        return res.status(http_status_code.INTERNAL_SERVER_ERROR).send("unexpected server error");
    }
}

// get all posts
async function allPost(req, res) {
    try {
        const data = req.query;
        const limit = parseInt(data.limit || 10);
        const offset = parseInt(data.offset || 0);
        const result = await postModel.getRecentPost(limit, offset);
        return res.status(http_status_code.OK).send({Response : result.rows});
    }
    catch(err) {
        console.log(err);
        return res.status(http_status_code.INTERNAL_SERVER_ERROR).send("unexpected server error");
    }
}

// get post by id 
async function postById(req, res) {
    try {
        const post_id  = req.params.post_id;
        const result = await postModel.getPostById(post_id);
        if(result.rows.length === 0) {
            return res.status(http_status_code.NOT_FOUND).send('post not found');
        }
        return res.status(http_status_code.OK).send({Response : result.rows});
    }
    catch(err) {
        console.log(err);
        res.status(http_status_code.INTERNAL_SERVER_ERROR).send("unexpected server error");
    }
}

// update a post 
async function updatePost(req, res) {
    try {
        const data = req.body;
        const post_id = req.params.post_id;
        const postExist = await postModel.getPostById(post_id);
        if(postExist.rows.length === 0) {
            return res.status(http_status_code.NOT_FOUND).send("post not found");
        }
        if(postExist && postExist.rows[0].user_id !== req.user.userId) {
            return res.status(http_status_code.UNAUTHORIZED).send("unauthorized");
        }
        const inputFields = [];
        const values = [];
        Object.keys(data).forEach((key, index) => {
            inputFields.push(`${key} = $${index + 1}`);
            values.push(data[key]);
        });
        values.push(post_id);
        const result = await postModel.updateByPostId(post_id, inputFields, values);
        return res.status(http_status_code.OK).send("post updated"); 
    }
    catch(err) {
        console.log(err);
        res.status(http_status_code.INTERNAL_SERVER_ERROR).send("unexpected server error");
    }
}

module.exports = { newPost, allPost, postById, updatePost };