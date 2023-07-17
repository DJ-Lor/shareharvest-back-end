const express = require('express')
const listingRouter = express.Router()
const { createListing, updateListing, deleteListing, getListings, createComment, getListing, getComments } = require('../controllers/ListingController')
const auth = require('../middleware/auth')

listingRouter.get('/', auth, getListings)
listingRouter.post('/', auth, createListing)
listingRouter.get('/:id', auth, getListing)
listingRouter.put('/:id', auth, updateListing)
listingRouter.delete('/:id', auth, deleteListing)
listingRouter.post('/:id/comments', auth, createComment)
listingRouter.get('/:id/comments', auth, getComments)

module.exports = listingRouter
