const express = require('express');
const { getAllPostsWCategories } = require('../model/postModel');

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

// DELETE /posts/:postId
//:postId

module.exports = postsRoutes;
