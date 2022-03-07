const express = require('express');
const { getAllCategories } = require('../model/catModel');

const catRoutes = express.Router();
// GET /categories (grazins visas kategorijas)
// getAllCategories()
catRoutes.get('/', async (req, res) => {
  const cats = await getAllCategories();
  if (cats === false) {
    res.status(500);
    return;
  }
  // isiusti postus atgal i vartotoja
  res.json({
    success: true,
    data: cats,
  });
});

module.exports = catRoutes;
