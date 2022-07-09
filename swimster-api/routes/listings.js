const express = require('express')
const Listing = require('../models/Listing')

const router = express.Router()

router.post('/', async (req, res, next) => {
    // creates a new listing
    try {
        // const user = res.locals.user
        const listing = await Listing.createListing({
            newListing: req.body,
            // user: user,
        })
        return res.status(201).json({ listing })
    } catch (err) {
        next(err)
    }
})

router.get('/', async (req, res, next) => {
    // fetches all listings
    try {

    } catch (err) {
        next(err)
    }
})

router.get('/:listingId', async (req, res, next) => {
    // fetches a listing by id
    try {

    } catch (err) {
        next(err)
    }
})

module.exports = router
