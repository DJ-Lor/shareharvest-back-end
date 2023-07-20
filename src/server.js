const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()

const PORT = process.env.PORT || 3001
const HOST = process.env.HOST || '127.0.0.1'

const helmet = require('helmet')
app.use(helmet())
app.use(helmet.permittedCrossDomainPolicies())
app.use(helmet.referrerPolicy())
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ['self']
  }
}))

const cors = require('cors')
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://deployedApp.com'],
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const databaseURL = process.env.DATABASE_URL
const { databaseConnector } = require('./database')
databaseConnector(databaseURL).then(() => {
  console.log('connected to the db!')
}).catch(error => {
  console.log('could not connect to the db!')
  console.log(error)
})

app.get('/databaseHealth', (request, response) => {
  const databaseState = mongoose.connection.readyState
  const databaseName = mongoose.connection.name
  const databaseModels = mongoose.connection.modelNames()
  const databaseHost = mongoose.connection.host

  response.json({
    readyState: databaseState,
    dbName: databaseName,
    dbModels: databaseModels,
    dbHost: databaseHost
  })
})

app.get('/', (request, response) => {
  response.json({
    message: 'Welcome to the ShareHarvest backend'
  })
})

// Add route to handle newsletter sign-up
const Subscriber = require('./models/Subscriber')

app.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body
    // Check if the email already exists in the Subscriber collection
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      return res.status(409).json({ error: 'Email already exists' })
    }
    // Create a new subscriber
    const subscriber = new Subscriber({ email })
    await subscriber.save()

    res.status(201).json({ message: 'Subscriber added successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to add subscriber' })
  }
})

const userRoutes = require('./routes/UserRoutes')
const listingRoutes = require('./routes/ListingRoutes')
app.use('/users', userRoutes)
app.use('/listings', listingRoutes)

app.get('*', (request, response) => {
  response.status(404)
  response.json({
    message: 'Route not found',
    path: request.path
  })
})

module.exports = {
  app, HOST, PORT
}
