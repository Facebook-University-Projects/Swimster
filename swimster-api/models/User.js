const db = require('../db')
const { UnauthorizedError, BadRequestError } = require('../utils/error')

class User {
    static async login(credentials) {
        // take the user's email and password and compare it to the db's password
        // edge cases: missing fields, user doesn't exist
    }

    static async register(credentials) {
        // take the user's first name, last name, email, phone number, address, date of birth, password
        const requiredFields = [
            "firstName",
            "lastName",
            "email",
            "phoneNumber",
            "address",
            "dateOfBirth",
            "password"
        ]
        // edge cases: user already exists, missing fields, existing email
        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        if (credentials.email.indexOf('@') <= 0) throw new BadRequestError("Invalid email.")

        const existingUser = await this.fetchUserByEmail(credentials.email)
        if (existingUser) throw new BadRequestError(`The email ${credentials.email} already exists!`)

        // hash the user's password

        // create a new user object and return its info
        const result = await db.query(`
            INSERT INTO users (
                first_name,
                last_name,
                email,
                phone_number,
                address,
                date_of_birth,
                password
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id, first_name, last_name, email, phone_number, address, date_of_birth, password, created_at, is_admin;
        `, [
            credentials.firstName,
            credentials.lastName,
            credentials.email.toLowerCase(),
            credentials.phoneNumber,
            credentials.address,
            credentials.dateOfBirth,
            credentials.password
        ])

        const user = result.rows[0]
        return user
    }

    static async fetchUserByEmail(email) {
        if (!email) throw new BadRequestError("No email provided.")

        const query = `SELECT * FROM users WHERE email = $1`
        const result = await db.query(query, [email.toLowerCase()])
        const user = result.rows[0]

        return user
    }
}

module.exports = User
