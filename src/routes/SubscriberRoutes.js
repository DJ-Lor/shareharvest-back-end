const express = require('express')
const subscriberRouter = express.Router()
const { subscribeEmail } = require('../controllers/SubscriberController')

subscriberRouter.post('/', subscribeEmail)

module.exports = subscriberRouter
