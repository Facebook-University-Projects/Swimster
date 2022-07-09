const db = require('../db')
const { UnauthorizedError, BadRequestError } = require('../utils/error')

class Listing {
    static async createListing({ newListing }) {
        // take the listing name, address, description, price, totalGuests, poolType, amenities, images
        const requiredFields = [
            "title",
            "address",
            "description",
            "price",
            "totalGuests",
            "poolType",
            "hasBbqGrill",
            "hasInternet",
            "hasBathroom",
            "hasTowels",
            "hasLoungeChairs",
            "hasHotTub",
            "hasParking",
            "images"
        ]

        // edge cases: missing fields, there are < 5 images,
        requiredFields.forEach(field => {
            if (!newListing.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        const result = await db.query(`
            INSERT INTO listings (
                host_id,
                title,
                address,
                description,
                price,
                total_guests,
                pool_type,
                has_bbq_grill,
                has_internet,
                has_bathroom,
                has_towels,
                has_lounge_chairs,
                has_hot_tub,
                has_parking,
                images
            )
            VALUES (
                (SELECT id FROM users WHERE email = $1),
                $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
            )
            RETURNING id,
            $1 AS "host_id",
            title,
            address,
            description,
            price,
            total_guests,
            pool_type,
            has_bbq_grill,
            has_internet,
            has_bathroom,
            has_towels,
            has_lounge_chairs,
            has_hot_tub,
            has_parking,
            images,
            created_at;
        `, [
            "rmart@fb.com",
            newListing.title,
            newListing.address,
            newListing.description,
            newListing.price,
            newListing.totalGuests,
            newListing.poolType,
            newListing.hasBbqGrill,
            newListing.hasInternet,
            newListing.hasBathroom,
            newListing.hasTowels,
            newListing.hasLoungeChairs,
            newListing.hasHotTub,
            newListing.hasParking,
            newListing.images
        ])

        const listing = result.rows[0]
        return listing
    }
}

module.exports = Listing
