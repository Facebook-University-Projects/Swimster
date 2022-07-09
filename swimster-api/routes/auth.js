const express = require('express')
const User = require('../models/User')

const router = express.Router()

router.post('/login', async (req, res, next) => {
    try {
        // take the user's email and password to authenticate them
        const user = await User.login(req.body)
        return res.status(200).json({ user })
    } catch (err) {
        next(err)
    }
})

router.post('/register', async (req, res, next) => {
    try {
        // take the user's first name, last name, email, phone number, address, date of birth, password
        // create a new user obj in the database
        const user = await User.register(req.body)
        return res.status(201).json({ user })
    } catch (err) {
        next(err)
    }
})

module.exports = router
