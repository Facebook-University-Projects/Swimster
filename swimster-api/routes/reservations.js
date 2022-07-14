const express = require('express')
const Reservation = require('../models/Reservation')
const { requiresAuth } = require('../middleware/security')

const router = express.Router()

router.get('/listings/:listingId', requiresAuth, (req, res, next) => {
    try {
        // fetch all reservations for one listing by listingId

    } catch (error) {
        next(error)
    }
})

router.get('/', requiresAuth, (req, res, next) => {
    try {
        // fetch all reservations created by authed user

    } catch (error) {
        next(error)
    }
})

router.get('/listings', requiresAuth, (req, res, next) => {
    try {
        // fetch all reservations for any user-owned listings

    } catch (error) {
        next(error)
    }
})

router.post('/listings/:listingId', requiresAuth, (req, res, next) => {
    try {
        // creates a reservation for a specific listing

    } catch (error) {
        next(error)
    }
})

module.exports = router
