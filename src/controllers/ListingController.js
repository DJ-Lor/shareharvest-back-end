const Listing = require('../models/Listing')
const Comment = require('../models/Comment')

const getListings = async (request, response) => {
  // By default return all user listings
  // If query params present - use title, postcode and category search
  const userId = request.user._id
  const category = request.query.category
  const postcode = request.query.postcode
  const title = request.query.title
  // Account for pagination
  const page = parseInt(request.query.page)
  const limit = parseInt(request.query.limit) || 6
  const query = {}

  if (category) {
    query.category = category
  }

  if (postcode) {
    query.postcode = postcode
  }

  if (title) {
    query.title = { $regex: new RegExp(title, 'i') }
  }

  try {
    if (!userId) {
      throw Error('Authorisation required')
    }
    // Variables for pagination
    const totalListings = await Listing.countDocuments(query)
    const responseTotalPages = Math.ceil(totalListings / limit)

    let foundListings
    const pageCalc = page - 1

    if (query) {
      foundListings = await Listing.find(query)
        .skip(pageCalc * limit)
        .limit(limit)
        .exec()
    } else {
      foundListings = await Listing.find()
        .skip(pageCalc * limit)
        .limit(limit)
        .exec()
    }
    response.send({ listings: foundListings, totalPages: responseTotalPages })
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }
}

const getMyListings = async (request, response) => {
  // Make sure you have access to userID
  // Using userID populate the listing associated to the id
  const userId = request.user._id

  // Account for pagination
  const page = parseInt(request.query.page)
  const limit = parseInt(request.query.limit) || 3
  try {
    if (!userId) {
      throw Error('Authorisation required')
    }

    // Variables for pagination
    const totalListings = await Listing.countDocuments({ userId })
    const responseTotalPages = Math.ceil(totalListings / limit)
    const pageCalc = page - 1
    let foundMyListings

    if (userId) {
      foundMyListings = await Listing.find({ userId })
        .skip(pageCalc * limit)
        .limit(limit)
        .exec()
    }
    response.send({ listings: foundMyListings, totalPages: responseTotalPages })
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }
}

const createListing = async (request, response) => {
  const category = request.body.category
  const postcode = request.body.postcode
  const title = request.body.title
  const description = request.body.description
  // Future feature
  // const imageUrlsPulled = request.body.imageUrlsPulled

  try {
    // Validate the username before saving
    if (title.length < 4) {
      return response.status(400).json({ error: 'Title must be at least 4 characters long!' })
    }
    // Validate the username before saving
    if (description.length < 4 || description.length > 1000) {
      return response.status(400).json({ error: 'Description must be at least 4 characters long and maximum of 500 characters!' })
    }
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
    response.send({ listing: updatedListing })
  } catch (error) {
    // Handle different types of errors
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return response.status(404).json({ error: 'Invalid Listing ID' })
    }
    return response.status(500).json({ error: error.message })
  }
}

const deleteListing = async (request, response) => {
  const listingId = request.params.id
  const userId = request.user._id

  try {
    if (!listingId) {
      throw new Error('Listing ID not provided')
    }
    if (!userId) {
      throw new Error('Authorization required')
    }

    // Check if the user owns the listing
    const listing = await Listing.findById(listingId)
    if (!listing) {
      throw new Error('Listing not found')
    }
    if (listing.userId.toString() !== userId.toString()) {
      throw new Error('You are not authorized to delete this listing')
    }

    // If all checks pass, proceed with the deletion
    await Listing.findByIdAndDelete(listingId)
    await Comment.deleteMany({ listingId })
    response.send({ message: 'Delete success' })
  } catch (error) {
    // Handle different types of errors
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return response.status(404).json({ error: 'Invalid Listing ID' })
    }
    return response.status(500).json({ error: error.message })
  }
}

const createComment = async (request, response) => {
  const listingId = request.params.id
  const comment = request.body.comment

  try {
    // Validate the username before saving
    if (comment.length > 150) {
      return response.status(400).json({ error: 'Comments have a maximum of 150 characters!' })
    }
    // Confirm listing exists
    if (!listingId) {
      throw Error('Listing not found')
    }
    if (!comment) {
      throw Error('Message input required')
    }
    const newComment = new Comment({
      comment,
      listingId,
      userId: request.user._id,
      createdAt: Date.now()
    })
    const createdComment = await newComment.save()
    const commentData = await Comment.findById(createdComment._id).populate('userId')
    return response.json({ comment: commentData })
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }
}

const getListing = async (request, response) => {
  // find the listingId
  // ensure a user is logged in
  // load all comments related to listingId

  const listingId = request.params.id
  const userId = request.user._id

  try {
    if (!listingId) {
      throw Error('Listing not found')
    }
    if (!userId) {
      throw Error('Authorisation required')
    }

    // Display the comments list
    const getListing = await Listing.findById(listingId)
    if (!getListing) {
      throw new Error('Listing not found')
    }
    // Access comments based on listId
    const getComments = await Comment.find({ listingId }).populate('userId')

    response.send({ listing: getListing, comments: getComments })
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }
}

module.exports = { createListing, updateListing, deleteListing, getListings, createComment, getMyListings, getListing }
