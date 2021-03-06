const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  desc: {
    type: Array,
    required: true
  },
  username: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
  categories: {
    type: Array,
    required: false
  },
}, { timestamps: true });

postSchema.index({title: 'text', categories: 'text', desc: 'text'})

module.exports = mongoose.model("Post", postSchema)