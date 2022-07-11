const express = require('express')
const Listing = require('../models/Listing')
const { requiresAuth } = require('../middleware/security')

const router = express.Router()

router.post('/', requiresAuth, async (req, res, next) => {
    try {
        // creates a new listing
        const user = res.locals.user
        const listing = await Listing.createListing({
            newListing: req.body,
            user: user,
        })
        return res.status(201).json({ listing })
    } catch (error) {
        next(error)
    }
})

router.get('/', requiresAuth, async (req, res, next) => {
    try {
        // fetches all listings
        const listings = await Listing.fetchListings()
        return res.status(200).json({ listings })
    } catch (error) {
        next(error)
    }
})

router.get('/:listingId', requiresAuth, async (req, res, next) => {
    try {
        // fetches a listing by id
        const listingId = req.params.listingId
        const listing = await Listing.fetchListingById(listingId)
        return res.status(200).json({ listing })
    } catch (error) {
        return next(error)
    }
})

module.exports = router
