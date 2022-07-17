const db = require('../db')
const { BadRequestError } = require('../utils/error')

class Reservation {
    static get TAX_RATE() {
        return 0.0725
    }

    static get FEES_RATE() {
        return 0.08
    }

    static async createReservation({ newReservation, listing, user }) {
        // creates a new reservation for a pool
        const requiredFields = ["date", "startTime", "endTime", "guests"]

        // edge cases: missing fields, time slot already exists in listing, guests > guests_allowed, outside of pool listing date ranges
        requiredFields.forEach(field => {
            if (!newReservation.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        if (newReservation.guests > listing.total_guests) {
            throw new BadRequestError(`Cannot have more than ${listing.total_guests} guests.`)
        }


        const totalCalculatedSQLString = this.totalCalculation()

        const result = await db.query(`
            INSERT INTO reservations (
                date,
                start_time,
                end_time,
                guests,
                total,
                listing_id,
                user_id
            )
            VALUES (
                ($1)::date,
                ($2)::time,
                ($3)::time,
                $4,
                ${totalCalculatedSQLString},
                $6,
                (SELECT id FROM users WHERE users.email = $7)
            )
            RETURNING   id,
                        (
                            SELECT email
                            FROM users
                            WHERE id = user_id
                        ) AS "user_email",
                        (
                            SELECT users.email
                            FROM users
                            WHERE users.id = (
                                SELECT listings.host_id
                                FROM listings
                                WHERE listings.id = listing_id
                            )
                        ) AS "host_email",
                        date,
                        start_time,
                        end_time,
                        guests,
                        total,
                        status,
                        created_at
        `, [
            newReservation.date,
            newReservation.startTime,
            newReservation.endTime,
            newReservation.guests || 1,
            listing.price,
            listing.id,
            user.email,
        ])
        const reservation = result.rows[0]
        return reservation
    }

    static totalCalculation() {
        const durationInHours = `EXTRACT(epoch FROM ($3)::time - ($2)::time) / 3600`
        const listingPrice = `$5`
        const subtotal = `${listingPrice} * ${durationInHours}`
        const feesTaken = `${subtotal} * ${this.FEES_RATE}`
        const taxesTaken = `${subtotal} * ${this.TAX_RATE}`
        const total = `ROUND(${subtotal} + ${feesTaken} + ${taxesTaken}, 2)`
        return total
    }

    static async fetchReservationsByListingId(listingId) {
        // fetch all reservations for a single lisitng to show when user clicks on individual listing
        const result = await db.query(`
            SELECT  reservations.id,
                    reservations.date,
                    reservations.start_time,
                    reservations.end_time,
                    reservations.guests,
                    reservations.total,
                    reservations.status,
                    reservations.created_at,
                    users.email,
                    (
                        SELECT hostUsers.email
                        FROM users AS hostUsers
                        WHERE hostUsers.id = (
                            SELECT listings.host_id
                            FROM listings
                            WHERE listings.id = listing_id
                        )
                    ) AS "host_email"
            FROM reservations
            JOIN users ON users.id = reservations.user_id
            WHERE listing_id = $1
            ORDER BY reservations.created_at DESC;
        `, [listingId])

        const reservations = result.rows
        return reservations
    }

    static async fetchReservationsFromUser({ user }) {
        // fetches all reservations created by user
        const result = await db.query(`
            SELECT  reservations.id,
                    reservations.date,
                    reservations.start_time,
                    reservations.end_time,
                    reservations.guests,
                    reservations.total,
                    reservations.status,
                    reservations.created_at,
                    users.email,
                    (
                        SELECT hostUsers.email
                        FROM users AS hostUsers
                        WHERE hostUsers.id = (
                            SELECT listings.host_id
                            FROM listings
                            WHERE listings.id = listing_id
                        )
                    ) AS "host_email",
                    listings.id AS "listing_id",
                    listings.title AS "listing_title",
                    listings.address AS "listing_address",
                    listings.images AS "listing_images"
            FROM reservations
            JOIN users ON users.id = reservations.user_id
            JOIN listings ON listings.id = reservations.listing_id
            WHERE user_id = (SELECT id FROM users WHERE email = $1)
            ORDER BY reservations.created_at DESC;
        `, [user.email])

        const reservations = result.rows
        return reservations
    }

    static async fetchReservationsFromHostListings({ user }) {
        // fetches all reservations from listings created by user
        const result = await db.query(`
            SELECT  reservations.id,
                    reservations.date,
                    reservations.start_time,
                    reservations.end_time,
                    reservations.guests,
                    reservations.total,
                    reservations.status,
                    reservations.created_at,
                    users.first_name,
                    users.last_name,
                    users.email,
                    listings.title AS "listing_title",
                    listings.address,
                    listings.images
            FROM reservations
            JOIN users ON users.id = reservations.user_id
            JOIN listings ON listings.id = reservations.listing_id
            AND listings.host_id = (
                SELECT hostUsers.id
                FROM users AS hostUsers
                WHERE hostUsers.email = $1
            )
            ORDER BY reservations.created_at DESC;
        `, [user.email])

        const reservations = result.rows
        return reservations
    }
}

module.exports = Reservation
