const db = require('../db')
const { UnauthorizedError, BadRequestError, NotFoundError } = require('../utils/error')

class Image {
    static async createImages(imageFiles) {
        if (imageFiles.length < 5) {
            throw new BadRequestError("Must upload at least 5 pictures!")
        }

        if (imageFiles.length > 10) {
            throw new BadRequestError("Cannot upload more than 10 pictures!")
        }

        const images = []

        for (let image of imageFiles) {
            const result = await db.query(`
                INSERT INTO images (
                    image_name,
                    image_path,
                    mime_type,
                    image_size,
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
                            image_path,
                            mime_type,
                            image_size,
                            listing_id
            `, [
                image.filename,
                image.path,
                image.mimetype,
                image.size,
                26 // TODO: adjust for listing id
            ])

            const imageCreated = result.rows[0]
            images.push(imageCreated)
        }

        return images
    }

    static async fetchImagesFromListing(listingId) {
        const result = await db.query(`
            SELECT  id,
                    image_name,
                    image_path,
                    mime_type,
                    image_size,
                    listing_id
            FROM images
            WHERE listing_id = $1
        `, [
            listingId
        ])

        const image = result.rows
        return image
    }
}

module.exports = Image
