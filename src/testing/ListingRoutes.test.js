const request = require('supertest')
const { app } = require('../server')
const { getToken } = require('./setup')
const listingRoutes = require('../routes/ListingRoutes')
const { describe, it, expect } = require('@jest/globals')

// Mount the user routes on the app for testing
app.use('/listings', listingRoutes)

// Test listing routes
describe('Listing Routes CRUD and comments', () => {
  let createdListingId // Variable to store the ID of the created listing
  it('should create a new listing', async () => {
    const token = getToken()
    const listing = { category: 'test', postcode: '2031', title: 'test', description: 'test' }
    const res = await request(app).post('/listings')
      .set('x-auth-token', token)
      .send(listing)
    expect(res.body).toHaveProperty('listing')
    createdListingId = res.body.listing._id // Store the ID of the created listing
  })
  it('should update a listing', async () => {
    const token = getToken()
    const listingId = createdListingId
    const updatedListing = { category: 'test', postcode: '2031', title: 'updated', description: 'test' }
    const res = await request(app).put(`/listings/${listingId}`)
      .set('x-auth-token', token)
      .send(updatedListing)
    expect(res.body).toHaveProperty('listing')
  })
  it('get listing view', async () => {
    const token = getToken()
    const listingId = createdListingId
    const res = await request(app)
      .get(`/listings/${listingId}`)
      .set('x-auth-token', `${token}`) // Set the Authorisation header with the token
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('listing')
  })
  it('get listings view', async () => {
    const token = getToken()
    const res = await request(app)
      .get('/listings')
      .set('x-auth-token', `${token}`) // Set the Authorisation header with the token
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('listings')
  })
  it('get my listing view', async () => {
    const token = getToken()
    const res = await request(app)
      .get('/listings/mylistings')
      .set('x-auth-token', `${token}`) // Set the Authorisation header with the token
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('listings')
  })
  it('should create a new comment', async () => {
    const token = getToken()
    const createdComment = { comment: 'test commenting feature' }
    const res = await request(app).post(`/listings/${createdListingId}/comments`)
      .set('x-auth-token', token)
      .send(createdComment)
    expect(res.body).toHaveProperty('comment')
    createdListingId = res.body.comment.listingId // Store the ID of the created comment
  })
  it('get comment view', async () => {
    const token = getToken()
    const listingId = createdListingId
    console.log(listingId)
    const res = await request(app)
      .get(`/listings/${listingId}`)
      .set('x-auth-token', `${token}`) // Set the Authorisation header with the token
    expect(res.body).toHaveProperty('comments')
  })
  it('delete listing', async () => {
    const token = getToken()
    const listingId = createdListingId
    const res = await request(app)
      .delete(`/listings/${listingId}`)
      .set('x-auth-token', `${token}`) // Set the Authorisation header with the token
    expect(res.statusCode).toEqual(200)
    expect(res.body.message).toEqual('Delete success')
  })
})
