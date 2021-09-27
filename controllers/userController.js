const express = require('express')
const router = express.Router()

const User = require('../models/users')

router.get('/', (req, res) => {
    res.render('login.ejs')
})

module.exports = router