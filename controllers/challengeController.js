const express = require('express')
const router = express.Router()

// Models
const Challenges = require('../models/challenges')
const seedData = require('../models/webDevSeed')

// Seed Route
router.get('/seed', async (req, res) => {
    try { 
        const seedItems = await Challenges.create(seedData)
        res.redirect('/challenge')
       } catch (err) {
           res.send(err.message)
       }
})

// Index Route
router.get('/', (req, res) => {
    Challenges.find({}, (err, allChallenges) => {
        res.render('index.ejs', {
            challenges: allChallenges
        })
    })
})

module.exports = router