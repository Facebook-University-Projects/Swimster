const multer = require('multer')
const path = require('path')
const { BadRequestError } = require('../utils/error')

// stores the files in memory as Buffer objects
const storage = multer.memoryStorage()

// controls which files are supported - jpg/jpeg
const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg") {
        return cb(null, true)
    } else {
        cb(null, false)
        const error = new BadRequestError("Only .jpeg and .jpg file types are allowed!")
        error.name = "ExtensionError"
        return cb(error)
    }
}

// creates multer object
const multiUpload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    fileFilter: fileFilter,
})

module.exports = multiUpload
