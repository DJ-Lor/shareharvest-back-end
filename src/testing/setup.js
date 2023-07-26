const request = require('supertest')
const { app } = require('../server')
const { beforeAll, expect } = require('@jest/globals')

let token

beforeAll(async () => {
  // Perform the user login action to get the token
  const user = { email: 'testuser2@example.com', password: 'testpassword' }
  const loginRes = await request(app).post('/users/login').send(user)
  expect(loginRes.body).toHaveProperty('token')

  // Save the token for reuse in other tests
  token = loginRes.body.token
})

module.exports = {
  getToken: () => token
}
