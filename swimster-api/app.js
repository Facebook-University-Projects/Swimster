const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { NotFoundError } = require('./utils/error')

const app = express()

/* MIDDLEWARE */
app.use(morgan('tiny'))
app.use(express.json())
app.use(cors())

/* ROUTES */

/* health check */
app.get('/', (req, res) => {
    return res.status(200).json({
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
