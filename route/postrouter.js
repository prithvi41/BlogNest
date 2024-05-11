const express = require('express');
const router = express.Router();
const postController = require('../controller/postcontroller');
const authenticate = require('../middleware/authenticate');

router.post('/new', authenticate, postController.newPost);
router.get('/allposts', postController.allPost);
router.get('/filter', postController.filterPost);
router.get('/:post_id', postController.postById);
router.patch('/:post_id', authenticate, postController.updatePost);
router.delete('/:post_id', authenticate, postController.deletePost);

module.exports = router;