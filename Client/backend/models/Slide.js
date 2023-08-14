const mongoose = require('mongoose');

const slideSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Slide = mongoose.model('Slide', slideSchema);

module.exports = Slide;
