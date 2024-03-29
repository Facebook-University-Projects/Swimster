const db = require('../db')
const { BadRequestError } = require('../utils/error')

class Reservation {
    static get TAX_RATE() {
        // currently California's state tax
        return 0.0725
    }

    static get FEES_RATE() {
        // arbitrary value estimated relative to Airbnb's 14% service fee rate
        return 0.08
    }

    static async createReservation({ newReservation, listing, user }) {
        // creates a new reservation for a pool
        const requiredFields = ["reservationDate", "startTime", "endTime", "guests"]

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
                reservation_date,
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
                        reservation_date,
                        start_time,
                        end_time,
                        guests,
                        total,
                        reservation_status,
                        created_at,
                        updated_at
        `, [
            newReservation.reservationDate,
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
        // cleanup of total calculation using placeholder values from SQL query string
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
                    reservations.reservation_date,
                    reservations.start_time,
                    reservations.end_time,
                    reservations.guests,
                    reservations.total,
                    reservations.reservation_status,
                    reservations.created_at,
                    reservations.updated_at,
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
            AND reservations.reservation_status = $2
            OR reservations.reservation_status = $3
            ORDER BY reservations.created_at DESC;
        `, [listingId, "DRAFT", "CONFIRMED"])

        const reservations = result.rows
        return reservations
    }

    static async fetchReservationsFromUser({ user }) {
        // fetches all reservations created by user
        const result = await db.query(`
            SELECT  reservations.id,
                    reservations.reservation_date,
                    reservations.start_time,
                    reservations.end_time,
                    reservations.guests,
                    reservations.total,
                    reservations.reservation_status,
                    reservations.created_at,
                    reservations.updated_at,
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
                    listings.city AS "listing_city",
                    listings.state AS "listing_state",
                    listings.images AS "listing_images"
            FROM reservations
            JOIN users ON users.id = reservations.user_id
            JOIN listings ON listings.id = reservations.listing_id
            WHERE user_id = $1
            ORDER BY reservations.created_at DESC;
        `, [user.id])

        const reservations = result.rows
        return reservations
    }

    static async fetchReservationsFromHostListings({ user }) {
        // fetches all reservations from listings created by user
        const result = await db.query(`
            SELECT  reservations.id,
                    reservations.reservation_date,
                    reservations.start_time,
                    reservations.end_time,
                    reservations.guests,
                    reservations.total,
                    reservations.reservation_status,
                    reservations.created_at,
                    reservations.updated_at,
                    users.first_name,
                    users.last_name,
                    users.email,
                    listings.title AS "listing_title",
                    listings.address,
                    listings.city,
                    listings.state,
                    listings.images
            FROM reservations
            JOIN users ON users.id = reservations.user_id
            JOIN listings ON listings.id = reservations.listing_id
            WHERE listings.host_id = $1
            ORDER BY reservations.created_at DESC;
        `, [user.id])

        const reservations = result.rows
        return reservations
    }

    static async confirmReservation(reservationId) {
        // updates reservation status to confirm
        const result = await db.query(`
            UPDATE      reservations
            SET         reservation_status = $1
            WHERE       id = $2
            RETURNING   *;
        `, [
            "CONFIRMED",
            reservationId
        ])

        const confirmedReservation = result.rows[0]
        return confirmedReservation
    }
}

module.exports = Reservation
