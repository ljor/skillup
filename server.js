const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const passport = require('passport') 
// const LocalStrategy = require('passport-local')
const flash = require('express-flash')
const session = require('express-session')
const connectEnsureLogin = require('connect-ensure-login')
// const passportLocalMongoose = require('passport-local-mongoose')
require('dotenv').config()

// const initializePassport = require('./config/passport')
// initializePassport(passport, (email) => {
//     return User.findOne({email: email} === email)
// },
// (id) => {
//     return User.findOne({id: id} === id)
// }
// )

// require('./config/passport')

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

    // user sessions/authentication
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUnitialized: false,
    // cookie: {maxAge: 60 * 60 * 1000}
}))
app.use(passport.initialize())
app.use(passport.session())
    // passport local strategy
 passport.use(User.createStrategy())

    // messaging for login/registration errors
app.use(flash())
app.use((req, res, next) => {
    res.locals.message = req.flash();
    next()
})

 // Sessions
 passport.serializeUser(User.serializeUser())
 passport.deserializeUser(User.deserializeUser())

 // Controllers
const challengeController = require('./controllers/challengeController.js')
app.use('/challenge', challengeController)
const userController = require('./controllers/userController')
 app.use('/', userController)

// Listener
app.listen(PORT, () => {
    console.log('Listening on port: ', PORT)
})