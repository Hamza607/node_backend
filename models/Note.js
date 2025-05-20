const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;