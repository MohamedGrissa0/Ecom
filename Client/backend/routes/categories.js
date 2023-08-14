const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Create a new category
router.post('/', async (req, res) => {
  try {
    const { name, desc, img } = req.body;
    const category = new Category({ name, desc, img });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific category
router.get('/:id', getCategory, (req, res) => {
  res.json(res.category);
});

// Update a category
router.patch('/:id', getCategory, async (req, res) => {
  try {
    const { name, desc, img } = req.body;
    if (name) res.category.name = name;
    if (desc) res.category.desc = desc;
    if (img) res.category.img = img;
    await res.category.save();
    res.json(res.category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a category
router.delete('/:id', getCategory, async (req, res) => {
  try {
    await res.category.remove();
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get a specific category by ID
async function getCategory(req, res, next) {
  let category;
  try {
    category = await Category.findById(req.params.id);
    if (category == null) {
      return res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.category = category;
  next();
}

module.exports = router;
