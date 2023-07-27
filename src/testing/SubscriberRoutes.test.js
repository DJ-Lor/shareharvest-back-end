const request = require('supertest')
const { app } = require('../server')
const subscriberRoutes = require('../routes/SubscriberRoutes')
const { describe, it, expect } = require('@jest/globals')

// Mount the subscriber routes on the app for testing
app.use('/subscribe', subscriberRoutes)

// Test subscriber route
describe('Subscriber Route', () => {
  it('should submit email to subscribe', async () => {
    const subscriber = { email: 'testusersubscriber3@example.com' }
    const res = await request(app).post('/subscribe').send(subscriber)
    expect(res.body.message).toEqual('Subscriber added successfully')
  })
})
