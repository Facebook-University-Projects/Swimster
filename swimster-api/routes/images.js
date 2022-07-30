const express = require('express')
const Image = require('../models/Image')
const { requiresAuth } = require('../middleware/security')
const multiUpload = require('../middleware/multer')

const router = express.Router()

router.get('/', requiresAuth, async (req, res, next) => {
    // fetches all of the images
    try {
        return res.json('/image api1')
    } catch (error) {
        next(error)
    }
})

router.post('/', requiresAuth, multiUpload.array("images", 10), async (req, res, next) => {
    // uploads image(s) for a listing
    try {
            // TODO: should be req.body in apiClient function
            const listingId = 27
            const imageFiles = req.files
            const images = await Image.createImages(imageFiles, listingId)
            return res.status(201).send({ images })
    } catch (error) {
        next(error)
    }
})

router.get('/listings/:listingId', async (req, res, next) => {
    // fetches all images for a single listing by listing id
    try {
        const listingId = req.params.listingId
        const listingImages = await Image.fetchImagesFromListing(listingId)
        // TODO: change to sendFile when getting aws stored images
        return res.status(200).send({ listingImages })
    } catch (error) {
        next(error)
    }
})

module.exports = router
