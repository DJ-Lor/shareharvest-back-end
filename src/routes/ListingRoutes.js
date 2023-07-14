const express = require('express')
const listingRouter = express.Router()
const { createListing, updateListing, deleteListing, getListings } = require('../controllers/ListingController')
const auth = require('../middleware/auth')

listingRouter.get('/mylisting', auth, getListings)
listingRouter.post('/', auth, createListing)
listingRouter.put('/:id', auth, updateListing)
listingRouter.delete('/:id', auth, deleteListing)

module.exports = listingRouter
