const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
require('dotenv').config()

const PORT = process.env.PORT

// Models
const Challenges = require('./models/challenges')
const seedData = require('./models/webDevSeed')

// Database Setup
const mongoURI = process.env.MONGODB_URI
const db = mongoose.connection

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Database connected')
})

db.on('error', (err) => {console.log('Error:', err)})
db.on('connected', () => {console.log('Mongo connected')})
db.on('disconnected', () => {console.log('Mongo disconnected')})

// Static Assets
app.use(express.static('public'))

// Middleware
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

// Controllers
const challengeController = require('./controllers/challengeController.js')
app.use('/challenge', challengeController)
const userController = require('./controllers/userController')
 app.use('/login', userController)

// Listener
app.listen(PORT, () => {
    console.log('Listening on port: ', PORT)
})