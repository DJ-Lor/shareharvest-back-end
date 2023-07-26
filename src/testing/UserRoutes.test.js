const request = require('supertest')
const { app } = require('../server')
const userRoutes = require('../routes/UserRoutes')
const { describe, it, expect } = require('@jest/globals')

// Mount the user routes on the app for testing
app.use('/users', userRoutes)

// Test user routes
describe('User Routes', () => {
  let token // Variable to store the token for reuse in the tests

  it('should create a new user', async () => {
    const user = { username: 'testuser', email: 'testuser2@example.com', password: 'testpassword', postcode: 'xxxx' }
    const res = await request(app).post('/users/signup').send(user)
    expect(res.body).toHaveProperty('token')
    // Save the token for reuse in other tests
    token = res.body.token
  })
  it('should login user', async () => {
    const user = { email: 'testuser2@example.com', password: 'testpassword' }
    const res = await request(app).post('/users/login').send(user)
    expect(res.body).toHaveProperty('token')
    // Save the token for reuse in other tests
    token = res.body.token
  })
  it('return user info', async () => {
    const res = await request(app)
      .get('/users/info')
      .set('x-auth-token', `${token}`) // Set the Authorisation header with the token
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('user')
  })
})
