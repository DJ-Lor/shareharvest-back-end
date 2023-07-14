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
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
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

const Listing = mongoose.model('Listing', ListingSchema)

module.exports = Listing
