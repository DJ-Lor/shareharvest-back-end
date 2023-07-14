const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({ userId: String, message: String })
const ListingSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  postcode: {
    type: String,
    required: true,
    maxlength: 4
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  comments: {
    type: [CommentSchema]
  },
  createdAt: {
    type: Date,
    required: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true
  }
})

const Listing = mongoose.model('Listing', ListingSchema)

module.exports = Listing
