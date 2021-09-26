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

// Create Route
router.get('/new', (req, res) => {
    res.render('new.ejs')
})

// Post Route for created challenge
router.post('/', (req, res) => {
    Challenges.create(req.body,(err, createdChallenge) => {
        if (err) {
            res.send(err)
        } else {
            res.redirect('/challenge')
        }
    })
})

// Show Route
router.get('/:id', (req, res) => {
    Challenges.findById(req.params.id,(err, foundChallenge) => {
        res.render('show.ejs', {
            challenge: foundChallenge
        })
    })
})

// Edit Route
router.get('/:id/edit', (req, res) => {
    Challenges.findById(req.params.id, (err, challengeToEdit) => {
        if(err) {
            res.send(err)
        } else {
            res.render('edit.ejs', {
                challenge: challengeToEdit
            })
        }
    })
})

// Put Route for challenge edit
router.put('/:id/edit', (req, res) => {
    Challenges.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true},
        (err, updatedChallenge) => {
        if (err) {
            res.send(err)
        } else {
            res.redirect(`/challenge/${req.params.id}`)
        }
        })
})

module.exports = router