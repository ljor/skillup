// const mongoose = require('mongoose')

// const userSchema = new mongoose.Schema({
//     name: {type: String, required: true},
//     email: {type: String, required: true, unique: true},
//     password: {type: String, required: true},
//     date: {type: Date, default: Date.now}
// })

// const User = mongoose.model('User', userSchema)

// module.exports = User

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const User = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true}
})

User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', User)