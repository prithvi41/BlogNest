const express = require('express');
const router = express.Router();
const postController = require('../controller/postcontroller');
const likeController = require('../controller/likecontroller');
const commentController = require('../controller/commentcontroller');
const authenticate = require('../middleware/authenticate');

router.post('/new', authenticate, postController.newPost);
router.get('/allposts', postController.allPost);
router.get('/filter', postController.filterPost);
router.get('/:post_id', postController.postById);
router.patch('/:post_id', authenticate, postController.updatePost);
router.delete('/:post_id', authenticate, postController.deletePost);
router.post('/:post_id/like', authenticate, likeController.likePost);
router.post('/:post_id/dislike', authenticate, likeController.dislikePost);
router.post('/:post_id/comment', authenticate, commentController.writeComment);
router.delete('/:post_id/comment/:comment_id', authenticate, commentController.removeComment);

module.exports = router;