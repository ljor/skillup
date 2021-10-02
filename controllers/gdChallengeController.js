const express = require('express')
const passport = require('passport') 
const connectEnsureLogin = require('connect-ensure-login')
const router = express.Router()

// Models
const GdChallenge = require('../models/challenge')
const gDSeedData = require('../models/graphicDesignSeed')

// Seed Route
router.get('/seed', async (req, res) => {
    try { 
        const seedItems = await GdChallenge.create(gDSeedData)
        res.redirect('/gdchallenge')
       } catch (err) {
           res.send(err.message)
       }
})

// Challenges Index Route
router.get('/', (req, res) => {
    GdChallenge.find({}, (err, allChallenges) => {
        res.render('gdchallenges.ejs', {
            challenges: allChallenges
        })
    })
})

// Create Route
router.get('/new', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.render('gdnew.ejs')
})

// Post Route for created challenge
router.post('/', (req, res) => {
    GdChallenge.create(req.body,(err, createdChallenge) => {
        if (err) {
            res.send(err)
        } else {
            res.redirect('/gdchallenge')
        }
    })
})

// Show Route
router.get('/:id', (req, res) => {
    GdChallenge.findById(req.params.id,(err, foundChallenge) => {
        res.render('gdshow.ejs', {
            challenge: foundChallenge
        })
    })
})

// Edit Route
router.get('/:id/edit', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    GdChallenge.findById(req.params.id, (err, challengeToEdit) => {
        if(err) {
            res.send(err)
        } else {
            res.render('gdedit.ejs', {
                challenge: challengeToEdit
            })
        }
    })
})

// Put Route for challenge edit
router.put('/:id/edit', (req, res) => {
    GdChallenge.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {new: true},
        (err, updatedChallenge) => {
        if (err) {
            res.send(err)
        } else {
            res.redirect(`/gdchallenge/${req.params.id}`)
        }
        })
})

// Delete Route
router.delete('/:id', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    GdChallenge.findByIdAndDelete(req.params.id, (err, challengeToDelete) => {
        if (err) {
            res.send(err)
        } else {
            res.redirect('/gdchallenge')
        }
    })
})

module.exports = router