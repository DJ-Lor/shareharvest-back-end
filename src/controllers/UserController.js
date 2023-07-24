const User = require('../models/User')
const { hashPassword, generateJWT, validateHashedData } = require('../services/auth')
const validator = require('email-validator')

// User Sign Up Route
const signup = async (request, response) => {
  const username = request.body.username
  const email = request.body.email
  const password = request.body.password
  const postcode = request.body.postcode

  try {
    // Validate the email before saving
    if (!validator.validate(email)) {
      return response.status(400).json({ error: 'Invalid email address!' })
    }
    // Validate the username before saving
    if (username.length < 2) {
      return response.status(400).json({ error: 'Username must be at least 2 characters long!' })
    }
    // Validate the username before saving
    if (password.length < 4) {
      return response.status(400).json({ error: 'Password must be at least 4 characters long!' })
    }
    // All fields need completed
    if (!username || !email || !password || !postcode) {
      throw Error('All fields are required')
    }
    // Check if email already exists
    const foundUser = await User.findOne({ email }).exec()
    if (foundUser) {
      return response.status(400).json({ message: 'Email already in use' })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      postcode,
      createdAt: Date.now()
    })
    await newUser.save()

    // generate a JWT token and send it back to the client
    const token = await generateJWT({ userId: newUser._id })
    return response.json({ token })
  } catch (error) {
    if (error.name === 'ValidationError') {
      // Handle validation errors
      const errors = Object.values(error.errors).map(err => err.message)
      return response.status(400).json({ error: errors })
    }
    response.status(500).json({ error: error.message })
  }
}

// User Login Route
const login = async (request, response) => {
  const email = request.body.email
  const password = request.body.password

  try {
    // Validate the email before login
    if (!validator.validate(email)) {
      return response.status(400).json({ error: 'Invalid email address!' })
    }
    // Check if email and password were provided
    if (!email || !password) {
      throw Error('email and password required')
    }
    // Check if email exists
    const foundUser = await User.findOne({ email }).exec()
    if (!foundUser) {
      return response.status(404).json({ message: 'Email does not exist' })
    }

    // Check if password is a match
    const isMatch = await validateHashedData(password, foundUser.password)
    if (!isMatch) {
      return response.status(400).json({ message: 'Password incorrect' })
    } else {
      // generate a JWT token and send it back to the client
      const token = await generateJWT({ userId: foundUser._id })
      return response.json({ token })
    }
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }
}

// User Info Route
const info = async (request, response) => {
  try {
    const foundUser = await User.findById(request.user._id).select('-password')
    response.status(200).json({ user: foundUser })
  } catch (error) {
    return response.status(500).json({ error: error.message })
  }
}

module.exports = { signup, login, info }
