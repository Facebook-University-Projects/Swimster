const db = require('../db')
const { UnauthorizedError, BadRequestError, NotFoundError } = require('../utils/error')

class Reservation {
    static async createReservation({ newReservation, listing, user }) {
        // creates a new reservation for a pool
        const requiredFields = ["date", "startTime", "endTime", "guests"]

        // edge cases: missing fields, time slot already exists in listing, outside of pool listing date ranges
        requiredFields.forEach(field => {
            if (!newReservation.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

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
                CEIL (
                    $5
                ),
                --- subtotal = (listing_price + fees) * (end_time - start_time)
                --- total = subtotal + (taxes_decimal * subtotal)
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
}

module.exports = Reservation
