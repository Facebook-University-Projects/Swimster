const db = require('../db')
const { UnauthorizedError, BadRequestError, NotFoundError } = require('../utils/error')

class Image {
    static async createImage(fileInfo) {
        const { filename, mimetype, size, path } = fileInfo

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
            filename,
            path,
            mimetype,
            size,
            26 // TODO: adjust for listing id
        ])

        const image = result.rows[0]
        return image
    }

    static async getImage(fileName) {
        const result = await db.query(`
            SELECT  id,
                    image_name,
                    image_path,
                    mime_type,
                    image_size,
                    listing_id
            FROM images
            WHERE image_name = $1
        `, [
            fileName
        ])

        const image = result.rows[0]
        return image
    }
}

module.exports = Image
