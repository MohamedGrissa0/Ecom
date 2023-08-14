const express = require('express');
const router = express.Router();
const Slide = require('../models/Slide'); // Assuming Slide model is in a separate file

// GET all slides
router.get('/', async (req, res) => {
  try {
    const slides = await Slide.find();
    res.json(slides);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET a specific slide by ID
router.get('/:id', async (req, res) => {
  try {
    const slide = await Slide.findById(req.params.id);
    if (!slide) {
      return res.status(404).json({ error: 'Slide not found' });
    }
    res.json(slide);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// CREATE a new slide
router.post('/', async (req, res) => {
  try {
    const slide = new Slide(req.body);
    await slide.save();
    res.status(201).json(slide);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// UPDATE an existing slide
router.put('/:id', async (req, res) => {
  try {
    const slide = await Slide.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!slide) {
      return res.status(404).json({ error: 'Slide not found' });
    }
    res.json(slide);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE a slide
router.delete('/:id', async (req, res) => {
  try {
    const slide = await Slide.findByIdAndRemove(req.params.id);
    if (!slide) {
      return res.status(404).json({ error: 'Slide not found' });
    }
    res.json({ message: 'Slide deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
