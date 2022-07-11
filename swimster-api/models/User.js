const db = require('../db')
const bcrypt = require('bcrypt')
const { SALT_WORK_FACTOR } = require('../config')
const { UnauthorizedError, BadRequestError } = require('../utils/error')

class User {
    static publicUserInfo(user) {
        return {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            phoneNumber: user.phone_number,
            address: user.address,
            createdAt: user.created_at,
        }
    }

    static async login(credentials) {
        // take the user's email and password
        const requiredFields = ["email", "password"]

        // edge cases: missing fields, user doesn't exist
        requiredFields.forEach(field => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        const user = await this.fetchUserByEmail(credentials.email)
        if (user) {
            // compare user's inputted password to the db's password, if any
            const isValidPassword = await bcrypt.compare(credentials.password, user.password)
            if (isValidPassword) return this.publicUserInfo(user)
        }

        throw new UnauthorizedError("Incorrect email and\/or password.")
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
        const hashedPassword = await bcrypt.hash(credentials.password, SALT_WORK_FACTOR)

        // convert email to all lower case before storing in db
        const lowercaseEmail = credentials.email.toLowerCase()

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
            RETURNING id, first_name, last_name, email, phone_number, address, date_of_birth, created_at;
        `, [
            credentials.firstName,
            credentials.lastName,
            lowercaseEmail,
            credentials.phoneNumber,
            credentials.address,
            credentials.dateOfBirth,
            hashedPassword,
        ])

        const user = result.rows[0]
        return this.publicUserInfo(user)
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
