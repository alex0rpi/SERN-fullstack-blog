const express = require('express');
const router = express.Router();
const { Comments } = require('../models');

router.get('/:postId', async (req, res) => {
  const postId = req.params.postId;
  //   return all the comments related to that post.
  const CommentsList = await Comments.findAll({ where: { PostId: postId } });
  res.json(CommentsList);
});

router.post('/', async (req, res) => {
  const comment = req.body;
  await Comments.create(comment);
  res.json(comment);
});

router.delete('/:commentId', async (req, res) => {
  const commentId = req.params.commentId;
  await Comments.destroy({ where: { id: commentId } });
  res.json({ message: 'Comment was deleted' });
});

module.exports = router;
