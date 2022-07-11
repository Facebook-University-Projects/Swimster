const jwt = require('jsonwebtoken')
const { SECRET_TOKEN_KEY } = require('../config')

const generateToken = data => {
    jwt.sign(data, SECRET_TOKEN_KEY, { expiresIn: "12h" })
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
    validateToken,
}
