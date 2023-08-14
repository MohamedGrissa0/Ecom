const express = require('express');
const router = express.Router();
const Store = require('../models/Store');

// Get store information
router.get('/', async (req, res) => {
  try {
    const store = await Store.findOne();
    res.json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update store information
router.put('/:id', async (req, res) => {
  const { name, description } = req.body;

  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    store.name = name;
    store.description = description;
    await store.save();

    res.json(store);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
