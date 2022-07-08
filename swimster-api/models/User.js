const { UnauthorizedError } = require('../utils/error')

class User {
    static async login(credentials) {
        // take the user's email and password and compare it to the db's password
        // edge cases: missing fields, user doesn't exist
    }

    static async register(credentials) {
        // take the user's first name, last name, email, phone number, address, date of birth, password
        // edge cases: user already exists, missing fields

        // hash the user's password

        // create a new user object and return its info
    }
}

module.exports = User
