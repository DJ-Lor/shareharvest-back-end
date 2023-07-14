const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  listingId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Listing'
  },
  comment: {
    type: String,
    maxlength: 500,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  }
})

const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
