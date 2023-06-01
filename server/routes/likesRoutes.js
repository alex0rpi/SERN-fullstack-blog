const express = require('express');
const validateToken = require('../middlewares/AuthMiddleware');
const router = express.Router();
const { Likes } = require('../models');

// Like or unlike a post
router.post('/', validateToken, async (req, res) => {
  const UserId = req.user.id;
  const { PostId } = req.body;

  //   avoid a same user liking the same post twice. Allow removing the like of a post for a specific user.
  const found = await Likes.findOne({ where: { PostId: PostId, UserId: UserId } });
  if (!found) {
    await Likes.create({ PostId: PostId, UserId: UserId });
    res.status(200).json({ liked: true });
  } else {
    await Likes.destroy({ where: { PostId: PostId, UserId: UserId } });
    res.status(200).json({ liked: false });
  }
});

module.exports = router;
