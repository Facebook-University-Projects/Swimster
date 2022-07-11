const db = require('../db')
const { UnauthorizedError, BadRequestError, NotFoundError } = require('../utils/error')

class Listing {
    static async createListing({ newListing, user }) {
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
            images,
            created_at;
        `, [
            user.email,
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

    static async fetchListings() {
        // fetches all listings w/ broad info
        const result = await db.query(`
            SELECT  listings.id,
                    listings.host_id,
                    listings.title,
                    listings.address,
                    listings.price,
                    listings.total_guests,
                    listings.images
            FROM listings;
        `)

        const allListings = result.rows
        return allListings
    }

    static async fetchListingById(listingId) {
        // fetches a single listing by id w/ detailed info
        // also returns host info to display
        const result = await db.query(`
            SELECT  listing.id,
                    listing.host_id,
                    host.first_name,
                    host.last_name,
                    host.email,
                    host.phone_number,
                    listing.title,
                    listing.address,
                    listing.description,
                    listing.price,
                    listing.total_guests,
                    listing.pool_type,
                    listing.has_bbq_grill,
                    listing.has_internet,
                    listing.has_bathroom,
                    listing.has_towels,
                    listing.has_lounge_chairs,
                    listing.has_hot_tub,
                    listing.has_parking,
                    listing.images,
                    listing.created_at
            FROM listings AS listing
            JOIN users AS host ON host.id = listing.host_id
            WHERE listing.id = $1;
        `, [listingId])

        const listing = result.rows[0]
        if (listing?.title) return listing

        throw new NotFoundError("No listing found.")
    }
}

module.exports = Listing
