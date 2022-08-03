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

const getAwsS3Info = () => {
    const bucketName = process.env.AWS_BUCKET_NAME
    const bucketRegion = process.env.AWS_BUCKET_REGION
    const accessKey = process.env.AWS_ACCESS_KEY_ID
    const secretKey = process.env.AWS_SECRET_ACCESS_KEY

    return {
        bucketName: bucketName,
        bucketRegion: bucketRegion,
        accessKey: accessKey,
        secretKey: secretKey,
    }
}

console.log("Swimster Config: ".red)
console.log("PORT: ".blue, PORT)
console.log("Database URI: ".blue, getDatabaseUri())

module.exports = {
    PORT,
    SECRET_TOKEN_KEY,
    SALT_WORK_FACTOR,
    getDatabaseUri,
    getAwsS3Info,
}
