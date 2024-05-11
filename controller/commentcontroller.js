const commentModel = require('../model/Comment');
const postModel = require('../model/Post');
const http_status_code = require('../config/httpstatuscode');


async function writeComment(req, res) {
    try {
        const post_id = req.params.post_id;
        const user_id = req.user.userId;
        const comment_text = req.body.text;
        const postDetails = await postModel.getPostById(post_id);
        if(postDetails.rowCount.length === 0) {
            return res.status(http_status_code.NOT_FOUND).send('post not found');
        }
        await commentModel.addCommentAndIncreaseCount(comment_text, post_id, user_id);
        return res.status(http_status_code.CREATED).send("comment created");
    }
    catch(err) {
        console.log(err);
        return res.status(http_status_code.INTERNAL_SERVER_ERROR).send("unexpected server error");
    }
}

async function removeComment(req, res) {
    try {
        const post_id = req.params.post_id;
        const comment_id = req.params.comment_id;
        const postDetails = await postModel.getPostById(post_id);
        if(postDetails.rowCount.length === 0) {
            return res.status(http_status_code.NOT_FOUND).send('post not found');
        }
        const isUserComment =  await commentModel.getComment(comment_id, post_id, req.user.userId);
        if(isUserComment.rows.length === 0) {
            return res.status(http_status_code.UNAUTHORIZED).send('unauthorized');
        }
        await commentModel.removeCommentAndDecreaseCount(comment_id, post_id, req.user.userId);
        return res.status(http_status_code.OK).send('comment deleted');
    }
    catch(err) {
        console.log(err);
        return res.status(http_status_code.INTERNAL_SERVER_ERROR).send("unexpected server error");
    }
}

module.exports = { writeComment, removeComment };