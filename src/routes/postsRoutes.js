const express = require('express');
const { getAllPostsWCategories, insertNewPost } = require('../model/postModel');

const postsRoutes = express.Router();

postsRoutes.get('/', async (req, res) => {
  // panaudoti getAllPostsWCategories() ir jei gavom ne FALSE
  const posts = await getAllPostsWCategories();
  if (posts === false) {
    res.status(500);
    return;
  }
  // isiusti postus atgal i vartotoja
  res.json({
    success: true,
    data: posts,
  });
});

postsRoutes.post('/', async (req, res) => {
  const { title, body, category_id } = req.body;
  const insertResult = await insertNewPost(title, body, category_id);
  if (insertResult === false) {
    res.status(500);
    return;
  }
  if (insertResult.affectedRows !== 1) {
    res.status(400).json('no post created');
    return;
  }
  // console.log('insertResult ===', insertResult);
  res.json('Post created');
});

// GET /posts/cat/:cat_id

// DELETE /posts/:postId
// :postId

module.exports = postsRoutes;
