const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
  picture: String,
  author: String,
  date: String,
  overview: String,
  original_title: String,
  publisher: String,
  isbn: String,
  setting: String,
  language: String,
  selectedGenre: String
});

module.exports = mongoose.model('User', UserSchema);
