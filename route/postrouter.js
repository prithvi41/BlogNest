const express = require('express');
const router = express.Router();
const postController = require('../controller/postcontroller');
const authenticate = require('../middleware/authenticate');

router.post('/new', authenticate, postController.newPost);
router.get('/allposts', postController.allPost);
router.get('/:post_id', postController.postById);
router.patch('/:post_id', authenticate, postController.updatePost);

module.exports = router;