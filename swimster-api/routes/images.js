const express = require('express')
const Image = require('../models/Image')
const { requiresAuth } = require('../middleware/security')
const multiUpload = require('../middleware/multer')
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

router.post('/', requiresAuth, multiUpload.array("images", 10), async (req, res, next) => {
    // uploads image(s) for a listing
    try {
            const imageFiles = req.files

            return res.status(200).end("Images uploaded successfully")
    } catch (error) {
        next(error)
    }
})

// TODO: change to fetch by listing id
router.get('/:fileName', async (req, res, next) => {
    // fetches all images for a single listing by listing id
    try {
        const fileName = req.params.fileName
        const image = await Image.getImage(fileName)
        if (image) {
            const dirName = path.resolve()
            const absoluteFilePath = path.join(
                dirName,
                image.image_path
            )
            return res.type(image.mime_type).sendFile(absoluteFilePath)
        }
    } catch (error) {
        next(error)
    }
})

module.exports = router
