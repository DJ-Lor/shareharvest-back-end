const request = require('supertest')
const { app } = require('../server')
const { describe, it, expect } = require('@jest/globals')

// Homepage test.
describe('Home page route exists.', () => {
  it("Server 'homepage' can be viewed.", async () => {
    const res = await request(app).get('/')
    expect(res.statusCode).toEqual(200)
  })
  it("The 'message' property exists and has data", async () => {
    const res = await request(app).get('/')
    expect(res.body).toHaveProperty('message')
  })

  // Example of checking the response body for specific values:
  it("The 'message' property exists and says 'Hello world!'", async () => {
    const res = await request(app).get('/')
    expect(res.body.message).toEqual('Welcome to the ShareHarvest backend')
  })
})
