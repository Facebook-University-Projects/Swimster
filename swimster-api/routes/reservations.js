const express = require('express')
const Reservation = require('../models/Reservation')
const { requiresAuth } = require('../middleware/security')
const Listing = require('../models/Listing')

const router = express.Router()

router.get('/listings/:listingId', requiresAuth, async (req, res, next) => {
    try {
        // fetch all reservations for one listing by listingId
        const listingId = req.params.listingId
        const reservationsForListing = await Reservation.fetchReservationsByListingId(listingId)
        return res.status(200).json({ reservationsForListing })
    } catch (error) {
        next(error)
    }
})

router.get('/', requiresAuth, async (req, res, next) => {
    try {
        // fetch all reservations created by authed user

    } catch (error) {
        next(error)
    }
})

router.get('/listings', requiresAuth, async (req, res, next) => {
    try {
        // fetch all reservations for any user-owned listings

    } catch (error) {
        next(error)
    }
})

router.post('/listings/:listingId', requiresAuth, async (req, res, next) => {
    try {
        // creates a reservation for a specific listing
        const listingId = req.params.listingId
        const listing = await Listing.fetchListingById(listingId)
        const user = res.locals.user
        const reservation = await Reservation.createReservation({
            newReservation: req.body,
            listing: listing,
            user: user,
        })
        res.status(201).json({ reservation })
    } catch (error) {
        next(error)
    }
})

module.exports = router
