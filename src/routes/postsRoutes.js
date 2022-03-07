const express = require('express');

const postsRoutes = express.Router();

postsRoutes.get('/', async (req, res) => {
  // panaudoti getAllPostsWCategories() ir jei gavom ne FALSE
  // isiusti postus atgal i vartotoja
});

module.exports = postsRoutes;
