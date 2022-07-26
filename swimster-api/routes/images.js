const express = require('express')
const { requiresAuth } = require('../middleware/security')
const imageUpload = require('../middleware/imageUpload')
const path = require('path')

const router = express.Router()

router.get('/', requiresAuth, async (req, res, next) => {
    // fetches all of the images
    try {
        return res.json('/image api1')
    } catch (error) {
        next(error)
    }
})

router.post('/', requiresAuth, imageUpload.single('images'), async (req, res, next) => {
    // uploads a new image for a listing
    try {
        // const listingId = req.params.listingId
        console.log(req.file)
        return res.json(`/image api`)
    } catch (error) {
        next(error)
    }
})

// TODO: change to fetch by listing id
router.get('/:fileName', async (req, res, next) => {
    // fetches all images for a single listing by listing id
    try {
        const fileName = req.params.fileName
        console.log('fileName: ', fileName);
        const dirName = path.resolve()
        console.log('dirName: ', dirName);
        const absolutePath = path.join(dirName, 'images/' + fileName)
        console.log('absolutePath: ', absolutePath);
        return res.sendFile(absolutePath)
    } catch (error) {
        next(error)
    }
})

module.exports = router
