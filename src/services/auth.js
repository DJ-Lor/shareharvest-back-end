const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10

// Hash user password
const hashPassword = async (password) => {
// Generate a random string through the number of saltRounds
  const saltToAdd = await bcrypt.genSalt(saltRounds)
  // Hash the password and attach the salt to it.
  const hashedPassword = await bcrypt.hash(password, saltToAdd)
  return hashedPassword
}

async function validateHashedData (providedUnhashedData, storedHashedData) {
  return await bcrypt.compare(providedUnhashedData, storedHashedData)
}

// JWT functionality
function generateJWT (payloadObj) {
  return jwt.sign(payloadObj, process.env.JWT_SECRET, { expiresIn: '1d' })
}

module.exports = {
  hashPassword,
  validateHashedData,
  generateJWT
}
