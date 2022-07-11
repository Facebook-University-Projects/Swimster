const jwt = require('jsonwebtoken')
const { SECRET_TOKEN_KEY } = require('../config')

const generateToken = data => {
   return jwt.sign(data, SECRET_TOKEN_KEY, { expiresIn: "12h" })
}

const createUserJwt = user => {
    const payload = {
        email: user.email,
        phoneNumber: user.phoneNumber,
    }
    return generateToken(payload)
}

const validateToken = token => {
    try {
        const decoded = jwt.verify(token, SECRET_TOKEN_KEY)
        return decoded
    } catch (err) {
        return {}
    }
}

module.exports = {
    generateToken,
    createUserJwt,
    validateToken,
}
