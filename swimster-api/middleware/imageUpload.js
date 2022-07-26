const multer = require('multer')

// creating multer object
const imageUpload = multer({
    dest: 'images',
})

module.exports = imageUpload
