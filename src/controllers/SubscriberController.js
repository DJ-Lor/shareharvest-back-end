const Subscriber = require('../models/Subscriber')
const validator = require('email-validator')

const subscribeEmail = async (request, response) => {
  try {
    const { email } = request.body

    // Validate the email before saving
    if (!validator.validate(email)) {
      return response.status(400).json({ error: 'Invalid email address!' })
    }
    // Check if the email already exists in the Subscriber collection
    const existingSubscriber = await Subscriber.findOne({ email })

    if (existingSubscriber) {
      return response.status(409).json({ error: 'Email already exists' })
    }
    // Create a new subscriber
    const subscriber = new Subscriber({ email })
    await subscriber.save()

    response.status(201).json({ message: 'Subscriber added successfully' })
  } catch (error) {
    response.status(500).json({ error: 'Failed to add subscriber' })
  }
}

module.exports = { subscribeEmail }
