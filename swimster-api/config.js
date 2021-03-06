require('dotenv').config()
require('colors')

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001
const SALT_WORK_FACTOR = 13
const SECRET_TOKEN_KEY = process.env.SECRET_TOKEN_KEY || "some_secret_key"

const getDatabaseUri = () => {
    const dbUser = process.env.DATABASE_USER || "postgres"
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres"
    const dbHost = process.env.DATABASE_HOST || "localhost"
    const dbPort = process.env.DATABASE_PORT || 5432
    const dbName = process.env.DATABASE_NAME || "swimster"

    return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
}

console.log("Swimster Config: ".red)
console.log("PORT: ".blue, PORT)
console.log("Database URI: ".blue, getDatabaseUri())

module.exports = {
    PORT,
    SECRET_TOKEN_KEY,
    SALT_WORK_FACTOR,
    getDatabaseUri,
}
