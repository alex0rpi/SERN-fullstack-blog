const express = require('express');
const router = express.Router();
const { Comments } = require('../models/');
// const Comments = require('../models/Comments')
const validateToken = require('../middlewares/AuthMiddleware');

router.get('/:postId', async (req, res) => {
  const postId = req.params.postId;
  //   return all the comments related to that post.
  const CommentsList = await Comments.findAll({ where: { PostId: postId } });
  res.json(CommentsList);
});

router.post('/', validateToken, async (req, res) => {
  const comment = req.body;
  const username = req.user.username; /*we add this user property to the req. object
  at the moment our validateToken middlewares intercepts this request*/
  comment.username = username //we include the username property into the comment object.
  // Now it contains bodyText and username
  await Comments.create(comment);
  res.json(comment);
});

router.delete('/:commentId', async (req, res) => {
  const commentId = req.params.commentId;
  await Comments.destroy({ where: { id: commentId } });
  res.json({ message: 'Comment was deleted' });
});

module.exports = router;
