const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  }
});

module.exports = mongoose.model('Store', storeSchema);
