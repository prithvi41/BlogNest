const http_status_code = require('../config/httpstatuscode');
const likeModel = require('../model/Like');
const postModel = require('../model/Post');

async function likePost(req, res) {
    try {
        const post_id = req.params.post_id;
        const user_id = req.user.userId;
        const postDetails = await postModel.getPostById(post_id);
        if(postDetails.rowCount.length === 0) {
            return res.status(http_status_code.NOT_FOUND).send('post not found');
        }
        const userAlreadyLiked = await likeModel.getLike(post_id, user_id);
        if(userAlreadyLiked.rows.length !== 0) {
            return res.status(http_status_code.BAD_REQUEST).send('post already liked');
        }
        await likeModel.createLike(post_id, user_id);
        await postModel.increaseLikesCount(post_id);
        return res.status(http_status_code.CREATED).send("post liked");
    }
    catch(err) {
        console.log(err);
        return res.status(http_status_code.INTERNAL_SERVER_ERROR).send("unexpected server error");
    }
}

async function dislikePost(req, res) {
    try {
        const post_id = req.params.post_id;
        const postDetails = await postModel.getPostById(post_id);
        if(postDetails.rowCount.length === 0) {
            return res.status(http_status_code.NOT_FOUND).send('post not found');
        }
        const isLikedByUser =  await likeModel.getLike(post_id, req.user.userId);
        if(isLikedByUser.rows.length === 0) {
            return res.status(http_status_code.UNAUTHORIZED).send('unauthorized');
        }
        await likeModel.destroyLike(post_id, req.user.userId);
        await postModel.decreaseLikesCount(post_id);
        return res.status(http_status_code.OK).send('post disliked');
    }
    catch(err) {
        console.log(err);
        return res.status(http_status_code.INTERNAL_SERVER_ERROR).send("unexpected server error");
    }
}

module.exports = { likePost, dislikePost };