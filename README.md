## ShareHarvest App backend 


const getListings = async (request, response) => {
  // By default return all user listings
  // If query params present - use title, postcode and category search

  console.log(request.query)

  const userId = request.user._id
  const foundListings = await Listing.find({ userId }).exec()

  try {
    if (!userId) {
      throw Error('Authorisation required')
    }
    response.send({ listings: foundListings })
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }
}