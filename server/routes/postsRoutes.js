const express = require('express');
const router = express.Router();
const { Posts, Likes } = require('../models'); //post instance
const validateToken = require('../middlewares/AuthMiddleware');
// *fetch all posts
router.get('/', validateToken, async (req, res) => {
  const postList = await Posts.findAll({ include: [Likes] });
  // find out all the likes the current users has made no which posts.
  const userLikes = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ listOfPosts: postList, listOfLikes: userLikes });
});

// *get ONE post
router.get('/byId/:id', async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findOne({ where: { id: id } }); //inventado pero funciona.
  // const post = await Posts.findByPk(id); //find by primary key
  res.json(post);
});

// *CREATE a post
router.post('/', async (req, res) => {
  const post = req.body;
  await Posts.create(post); // Sequelize inserts the posts in the Posts table
  res.json(post);
});

// *DELETE a post
router.get('/byId/:id', validateToken, async (req, res) => {
  
});

module.exports = router;
