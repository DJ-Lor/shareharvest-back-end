const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    uniqueCaseInsensitive: true,
    minlength: 2
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  },
  postcode: {
    type: String,
    required: true,
    maxlength: 4
  },
  createdAt: {
    type: Date,
    required: true
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
