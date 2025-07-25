const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
  genre: String
});

module.exports = mongoose.model('Book', bookSchema);
