const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  name: String,
  path: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Photo = mongoose.model('Photo', photoSchema, 'photos');

module.exports = Photo;
