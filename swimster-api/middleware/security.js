const jwt = require('jsonwebtoken')
const { SECRET_TOKEN_KEY } = require('../config')
const { UnauthorizedError } = require('../utils/error')

// extracts the JWT from the request header
const fromJwt = ({ headers }) => {
    if (headers?.authorization) {
        // splits the Bearer token by the space
        // ex. Authorization: "Bearer ctugjlvcfkchrrhkhelelhjngtljcgnt"
        const [scheme, token] = headers.authorization.split(" ")
        if (scheme.trim() === "Bearer") return token
    }
    return undefined
}

// attaches the user to the response object
const extractUserFromJwt = (req, res, next) => {
    try {
        const token = fromJwt(req)
        if (token) res.locals.user = jwt.verify(token, SECRET_TOKEN_KEY)
        return next()
    } catch (error) {
        return next()
    }
}

// verifies if the authenticated user exists
const requiresAuth = (req, res, next) => {
    try {
        const { user } = res.locals
        // checks if user obj and user email exists
        if (!user?.email) throw new UnauthorizedError()
        return next()
    } catch (error) {
        return next(error)
    }
}

module.exports = {
    requiresAuth,
    extractUserFromJwt,
}
