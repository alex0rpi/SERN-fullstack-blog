const express = require('express');
const router = express.Router();
const { Posts } = require('../models'); //post instance
// const Posts = require('../models/Posts') // Like this it does not work.
/* o bien así, hay que importar models como si fuera un objeto y accedes al modelo
en concreto que interesa o haces destructuring.*/
// const {Posts} = require('../models')

router.get('/', async (req, res) => {
  const postList = await Posts.findAll();
  res.json(postList);
});

router.get('/byId/:id', async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findOne({where:{id:id}}); //inventado pero funciona.
  // const post = await Posts.findByPk(id); //find by primary key
  res.json(post);
});

router.post('/', async (req, res) => {
  const post = req.body;
  await Posts.create(post); // Sequelize inserts the posts in the Posts table
  res.json(post);
});

module.exports = router;
