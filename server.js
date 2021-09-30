const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
require('dotenv').config()

// const initializePassport = require('./config/passport')
// initializePassport(passport, (email) => {
//     return User.findOne({email: email} === email)
// },
// (id) => {
//     return User.findOne({id: id} === id)
// }
// )

require('./config/passport')

const PORT = process.env.PORT

// Models
const User = require('./models/user')
const Challenge = require('./models/challenge')
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

// Middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUnitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())


// Controllers
const challengeController = require('./controllers/challengeController.js')
app.use('/challenge', challengeController)
const userController = require('./controllers/userController')
 app.use('/', userController)

// Listener
app.listen(PORT, () => {
    console.log('Listening on port: ', PORT)
})