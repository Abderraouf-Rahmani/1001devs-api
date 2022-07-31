const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  about: {
    type: String,
  },
  skills:{
    type: String,
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema)