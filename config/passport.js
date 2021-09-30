// const LocalStrategy = require('passport-local').Strategy
// const bcrypt = require('bcrypt')



// function initialize(passport, getUserByEmail, getUserById) {
//     const authenticateUser = async (email, password, done) => {
//         const user = getUserByEmail(email)
//         if(user === null) {
//             return done(null, false, {message: 'No user with that email'})
//         }
//         try {
//             if (await bcrypt.compare(password, user.password)) {
//                 return(done, user)
//             } else {
//                 return done(null, false, {message: 'Password incorrect'})
//             }
//         } catch (err) {
//             return done(error)
//         }
//     }
//     passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser))
//     passport.serializeUser((user, done) => {
//         done(null, user.id)
//     })
//     passport.deserializeUser((id, done) => {
//         return done(null, getUserById(id))
//     })
// }

// module.exports = initialize

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/user')

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({usernameField : 'email'}, (email, password, done) => {
            User.findOne({email : email})
            .then((user) => {
                if(!user) {
                    return done(null, false, {message: 'That email is not registered'})
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err

                    if(isMatch) {
                        return done(null, user)
                    } else {
                        return done(null, false, {message: 'Password incorrect'})
                    }
                })
            })
            .catch((err) => {
                console.log(err)
            })
        })
    )
    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })
    passport.deserialzeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user)
        })
    })
}