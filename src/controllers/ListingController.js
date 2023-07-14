const Listing = require('../models/Listing')

const getListings = async (request, response) => {
  const userId = request.user._id
  const foundListings = await Listing.find({ userId }).exec()

  try {
    if (!userId) {
      throw Error('Authorisation required')
    }
    response.send({ message: 'Your listings displayed!', listing: foundListings })
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }
}

const createListing = async (request, response) => {
  const category = request.body.category
  const postcode = request.body.postcode
  const title = request.body.title
  const description = request.body.description

  try {
    // All fields need completed
    if (!category || !postcode || !title || !description) {
      throw Error('All fields are required')
    }

    const newListing = new Listing({
      category,
      postcode,
      title,
      description,
      userId: request.user._id,
      createdAt: Date.now()
    })
    await newListing.save()

    return response.json({ listing: newListing })
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }
}

const updateListing = async (request, response) => {
  const listingId = request.params.id
  const userId = request.user._id

  const newListingData = {
    category: request.body.category,
    postcode: request.body.postcode,
    title: request.body.title,
    description: request.body.description
  }

  try {
    if (!listingId) {
      throw Error('Listing not found')
    }
    if (!userId) {
      throw Error('Authorisation required')
    }
    if (!newListingData) {
      throw Error('All fields need to be filled')
    }

    // Check if the user owns the listing
    const listing = await Listing.findById(listingId)
    if (!listing) {
      throw new Error('Listing not found')
    }
    if (listing.userId.toString() !== userId.toString()) {
      throw new Error('You are not authorised to edit this listing')
    }
    const updatedListing = await Listing.findByIdAndUpdate(listingId, newListingData, { new: true })
    response.send({ message: 'list updated!', listing: updatedListing })
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }
}

const deleteListing = async (request, response) => {
  const listingId = request.params.id
  const userId = request.user._id

  try {
    if (!listingId) {
      throw Error('Listing not found')
    }
    if (!userId) {
      throw Error('Authorisation required')
    }
    // Check if the user owns the listing
    const listing = await Listing.findById(listingId)
    if (!listing) {
      throw new Error('Listing not found')
    }
    if (listing.userId.toString() !== userId.toString()) {
      throw new Error('You are not authorised to edit this listing')
    }
    await Listing.findByIdAndDelete(listingId, { new: true })
    response.send({ message: 'listing deleted!' })
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }
}

module.exports = { createListing, updateListing, deleteListing, getListings }
