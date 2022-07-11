const express = require('express')
const User = require('../models/User')
const { requiresAuth } = require('../middleware/security')
const { createUserJwt } = require('../utils/tokens')

const router = express.Router()

router.post('/login', async (req, res, next) => {
    try {
        // take the user's email and password to authenticate them
        const user = await User.login(req.body)
        // creates a JWT for specific user to authorize authed user
        const token = createUserJwt(user)
        return res.status(200).json({ user, token })
    } catch (err) {
        next(err)
    }
})

router.post('/register', async (req, res, next) => {
    try {
        // take the user's first name, last name, email, phone number, address, date of birth, password
        // create a new user obj in the database
        const user = await User.register(req.body)
        // creates a JWT for specific user to authorize authed user
        const token = createUserJwt(user)
        return res.status(201).json({ user, token })
    } catch (err) {
        next(err)
    }
})

router.get('/me', requiresAuth, async (req, res, next) => {
    try {
        const { email } = res.locals.user
        const user = await User.fetchUserByEmail(email)
        const clientUserInfo = User.publicUserInfo(user)
        return res.status(200).json({ user: clientUserInfo })
    } catch (error) {
        next(err)
    }
})

module.exports = router
