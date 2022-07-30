const db = require('../db')
const { uploadImageToS3, fetchImageUrlFromS3 } = require('../s3')
const { UnauthorizedError, BadRequestError, NotFoundError } = require('../utils/error')

class Image {
    static publicImageInfo(image, url) {
        return {
            id: image.id,
            image_name: image.image_name,
            image_key: image.image_key,
            image_size: image.image_size,
            image_mimetype: image.image_mimetype,
            listing_id: image.listing_id,
            image_url: url,
        }
    }

    static async createImages(imageFiles, listingId) {
        if (imageFiles.length < 5) {
            throw new BadRequestError("Must upload at least 5 pictures!")
        }

        if (imageFiles.length > 10) {
            throw new BadRequestError("Cannot upload more than 10 pictures!")
        }

        const images = []

        for (let image of imageFiles) {
            // uploadImagesToS3 returning object
            const s3Image = await uploadImageToS3(image)

            // store key and/or etag in images table
            if (s3Image) {
                const result = await db.query(`
                    INSERT INTO images (
                        image_name,
                        image_key,
                        image_size,
                        image_mimetype,
                        listing_id
                    )
                    VALUES (
                        $1,
                        $2,
                        $3,
                        $4,
                        $5
                    )
                    RETURNING   id,
                                image_name,
                                image_key,
                                image_size,
                                image_mimetype,
                                listing_id
                `, [
                    image.originalname,
                    s3Image.key,
                    image.size,
                    image.mimetype,
                    listingId
                ])
                const imageCreated = result.rows[0]
                images.push(imageCreated)
            }
        }

        return images
    }

    static async fetchImagesFromListing(listingId) {
        const result = await db.query(`
            SELECT  id,
                    image_name,
                    image_key,
                    image_size,
                    image_mimetype,
                    listing_id
            FROM images
            WHERE listing_id = $1
        `, [listingId])

        const images = result.rows

        const imagesWithUrl = []

        for (let image of images) {
            const { image_key } = image
            const fetchedS3ImageUrl = await fetchImageUrlFromS3(image_key)

            // attaches aws url to image object sent back to client
            imagesWithUrl.push(this.publicImageInfo(image, fetchedS3ImageUrl))
        }

        return imagesWithUrl
    }
}

module.exports = Image
