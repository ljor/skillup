const express = require('express')
const passport = require('passport') 
const connectEnsureLogin = require('connect-ensure-login')
const router = express.Router()

// Models
const Challenge = require('../models/challenge')
const seedData = require('../models/webDevSeed')

// Seed Route
router.get('/seed', async (req, res) => {
    try { 
        const seedItems = await Challenge.create(seedData)
        res.redirect('/challenge')
       } catch (err) {
           res.send(err.message)
       }
})

// Challenges Index Route
router.get('/', (req, res) => {
    Challenge.find({}, (err, allChallenges) => {
        res.render('challenges.ejs', {
            challenges: allChallenges
        })
    })
})

// Create Route
router.get('/new', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.render('new.ejs')
})

// Post Route for created challenge
router.post('/', (req, res) => {
    Challenge.create(req.body,(err, createdChallenge) => {
        if (err) {
            res.send(err)
        } else {
            res.redirect('/challenge')
        }
    })
})

// Show Route
router.get('/:id', (req, res) => {
    Challenge.findById(req.params.id,(err, foundChallenge) => {
        res.render('show.ejs', {
            challenge: foundChallenge
        })
    })
})

// Edit Route
router.get('/:id/edit', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    Challenge.findById(req.params.id, (err, challengeToEdit) => {
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
    Challenge.findByIdAndUpdate(
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

// Delete Route
router.delete('/:id', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    Challenge.findByIdAndDelete(req.params.id, (err, challengeToDelete) => {
        if (err) {
            res.send(err)
        } else {
            res.redirect('/challenge')
        }
    })
})

module.exports = router