const mongoose = require('mongoose')

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
    required: true,
    trim: true,
    minlength: 4
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  imageUrlsPulled: {
    type: [String],
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  }
})

ListingSchema.index({ title: 'text' })

const Listing = mongoose.model('Listing', ListingSchema)

module.exports = Listing
