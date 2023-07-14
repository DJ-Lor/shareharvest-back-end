const express = require('express')
const usersRouter = express.Router()
const { signup, login, info } = require('../controllers/UserController')
const auth = require('../middleware/auth')

usersRouter.post('/signup', signup)
usersRouter.post('/login', login)
usersRouter.get('/info', auth, info)

module.exports = usersRouter
