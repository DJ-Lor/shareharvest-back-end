const mongoose = require('mongoose')
const validator = require('email-validator')

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function (value) {
        return validator.validate(value)
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Subscriber = mongoose.model('Subscriber', subscriberSchema)

module.exports = Subscriber
