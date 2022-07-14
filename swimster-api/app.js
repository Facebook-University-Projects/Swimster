const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const { NotFoundError } = require('./utils/error')
const { extractUserFromJwt } = require('./middleware/security')
const authRoutes = require('./routes/auth')
const listingRoutes = require('./routes/listings')
const reservationRoutes = require('./routes/reservations')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

// for every request, checks if Bearer token exists
// if it does, attach decoded user to res header
app.use(extractUserFromJwt)

/* ROUTES */
app.use('/auth', authRoutes)
app.use('/listings', listingRoutes)
app.use('/reservations', reservationRoutes)

/* health check */
app.get('/', (req, res) => {
    return res.status(200).send({
        ping: "pong",
    })
})

/* ERROR HANDLING */
app.use((req, res, next) => {
    return next(new NotFoundError())
})

app.use((error, req, res, next) => {
    const status = error.status || 500
    const message = error.message

    return res.status(status).json({
        error: {
            message,
            status
        }
    })
})

module.exports = app
