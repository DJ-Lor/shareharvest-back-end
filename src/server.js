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
  origin: ['https://shareharvest.onrender.com', 'https://dev-sharehavest.onrender.com'],
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

const userRoutes = require('./routes/UserRoutes')
const listingRoutes = require('./routes/ListingRoutes')
const subscriberRoutes = require('./routes/SubscriberRoutes')
app.use('/users', userRoutes)
app.use('/listings', listingRoutes)
app.use('/subscribe', subscriberRoutes)

app.use('*', (request, response) => {
  response.sendStatus(404)
  response.json({
    message: 'Route not found',
    path: request.path
  })
})

module.exports = {
  app, HOST, PORT
}
