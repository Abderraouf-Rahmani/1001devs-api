const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  desc: {
    type: Array,
    required: true,
    index: true
  },
  username: {
    type: String,
    required: true,
  },
  categories: {
    type: Array,
    required: false
  },
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema)