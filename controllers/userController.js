const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const Users = require('../models/users')
const passport = require('passport')
// const { render } = require('ejs')

// app.use(express.urlencoded({extended: false}))

router.get('/login', (req, res) => {
    res.render('login.ejs')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/challenge',
    failureRedirect: '/login',
    failureFlash: true
}))

router.get('/register', (req, res) => {
    res.render('register.ejs')
})

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        Users.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/users/login')
    } catch {
        res.redirect('/users/register')
    }

    // const {name, email, password, password2} = req.body
    // let errors = []

    // if(!name || !email || !password || password2) {
    //     errors.push({msg: 'Please fill in all fields'})
    // }

    // if(password !== password2) {
    //     errors.push({msg : 'Passwords don\'t match'})
    // }

    // if(password.length < 6) {
    //     errors.push({msg: 'Password must be at least 6 characters'})
    // }

    // if(errors.length > 0) {
    //     res.render('register', {
    //         errors: errors,
    //         name: name,
    //         email: email,
    //         password: password,
    //         password2: password2
    //     })
    // } else {
    //     Users.findOne({email: email}).exec((err, user) => {
    //         if(user) {
    //             errors.push({msg: 'Email is already registered'})
    //             render(res, errors, name, email, password, password2)
    //         } else {
    //             const newUser = new Users({
    //                 name: name,
    //                 email : email,
    //                 password : password
    //             })

    //             bcrypt.genSalt(10, (err, salt) => {
    //                 bcrypt.hash(newUser.password,salt, (err, hash) => {
    //                     if(err) {
    //                         throw err
    //                         newUser.password = hash;
    //                     }
    //                 })
    //             })
    //         }
    //     })
    // }
    // const salt = bcrypt.genSaltSync(10)
	// req.body.password = bcrypt.hashSync(req.body.password, salt)
	// console.log(req.body)

	// User.findOne({name: req.body.name}, (error, userExists) => {
	// 	if (userExists) {
	// 		res.send('That name is taken!')
	// 	} else {
	// 		Users.create(req.body, (error, createdUser) => {
    //             console.log(createdUser)
    //             res.redirect('/users/login')
	// 		})
	// 	}
	// })
})

module.exports = router