const mongoose = require('mongoose')

const challengeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: String,
    challenge: {type: String, required: true},
    skill: {type: String, required: true}
})

const GdChallenge = mongoose.model('GdChallenge', challengeSchema)

module.exports = GdChallenge