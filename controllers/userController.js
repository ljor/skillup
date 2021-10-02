const express = require('express')
const router = express.Router()
const passport = require('passport')
const connectEnsureLogin = require('connect-ensure-login')

const User = require('../models/user')

router.get('/', connectEnsureLogin.ensureLoggedIn(), (req,res) => {
    res.render('index.ejs',{
        user: req.session.passport.user
    })
})

router.get('/login', (req, res) => {
    res.render('login.ejs')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

router.get('/register', (req, res) => {
    res.render('register.ejs')
})

router.post('/register', (req, res) => {
    if(req.body.password !== req.body.password2) {
        req.flash('error', 'Password did not match')
        res.redirect('/register')
    } else {
        User.register({username: req.body.username, email: req.body.email}, req.body.password, (err, user) => {
            if (err) {
                return res.render('/register')
            }
            passport.authenticate('local')(req, res, () => {
                res.redirect('/')
            })
        })
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/login')
})

module.exports = router

// User.register({username: 'red', email: 'red@gmail.com'}, 'xklznrzpgu')
// User.register({username: 'green', email: 'green@gmail.com'}, 'afdgfdsr')