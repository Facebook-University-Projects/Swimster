const db = require('../db')
const { uploadImageToS3, fetchImageFromS3 } = require('../s3')
const { UnauthorizedError, BadRequestError, NotFoundError } = require('../utils/error')

class Image {
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
        // TODO: change query to match aws details
        // returns key for fetching image from s3 bucket
        const result = await db.query(`
            SELECT  id,
                    image_name,
                    image_url,
                    image_key,
                    image_size,
                    listing_id
            FROM images
            WHERE listing_id = $1
        `, [listingId])

        const images = result.rows

        // loop through all image keys and call getObject
        // store each result inside arr and return

        for (let image of images) {
            const fetchedS3Image = await fetchImageFromS3(image.image_key)
            console.log('fetchedS3Image: ', fetchedS3Image);
        }

        return images
    }
}

module.exports = Image
