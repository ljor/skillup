const express = require('express')
const router = express.Router()

// Models
const Challenges = require('../models/challenges')
const seedData = require('../models/webDevSeed')

// Seed Route
router.get('/seed', async (req, res) => {
    try { 
        const seedItems = await Challenges.create(seedData)
        res.redirect('/challenges')
       } catch (err) {
           res.send(err.message)
       }
})

module.exports = router