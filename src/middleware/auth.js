const jwt = require('jsonwebtoken')
const User = require('../models/User')

function auth (request, response, next) {
  const token = request.header('x-auth-token')

  if (!token) return response.status(401).json({ message: 'Unauthorised' })

  try {
    jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {
      if (error) {
        return response.status(401).json({ message: 'Unauthorised' })
      } else {
        const user = await User.findById(decoded.userId).exec()
        request.user = user
        next()
      }
    })
  } catch (error) {
    response.status(500).json({ message: 'There has been an error' })
  }
}

module.exports = auth
