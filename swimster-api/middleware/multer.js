const multer = require('multer')
const path = require('path')
const { BadRequestError } = require('../utils/error')

// disk storage engine - stores files to /images directory
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../images'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.fieldname + '_' + file.originalname)
    }
})

// controls which files are supported - jpg/jpeg
const fileFilter = (req, file, cb) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/jpg") {
        return cb(null, true)
    } else {
        cb(null, false)
        const error = new BadRequestError("Only .jpeg and .jpg are allowed!")
        error.name = "ExtensionError"
        return cb(error)
    }
}

// creates multer object
const multiUpload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    fileFilter
})

module.exports = multiUpload
