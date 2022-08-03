const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const crypto = require('crypto')
const { getAwsS3Info } = require('./config')

const s3BucketInfo = getAwsS3Info()
const BYTES = 32

const s3 = new S3Client({
    region: s3BucketInfo.bucketRegion,
    credentials: {
        accessKeyId: s3BucketInfo.accessKey,
        secretAccessKey: s3BucketInfo.secretKey
    }
})

// creates a hash and attaches itself to image file name for unique identification
const hashImageName = (bytes=BYTES, fileName) => crypto.randomBytes(bytes).toString('hex') + '_' + fileName

// uploads an image to s3
const uploadImageToS3 = async image => {
    try {
        const uploadParams = {
            Bucket: s3BucketInfo.bucketName,
            Key: hashImageName(BYTES, image.originalname),
            Body: image.buffer,
            ContentType: image.mimetype,
        }
        const result = await s3.send(new PutObjectCommand(uploadParams))
        return {
            result: result,
            key: uploadParams.Key,
        }
    } catch (error) {
        console.error(`AWS Uploading Error: ${error}`)
    }
}

// gets an image from s3
const fetchImageUrlFromS3 = async imageKey => {
    try {
        const objectParams = {
            Bucket: s3BucketInfo.bucketName,
            Key: imageKey,
        }
        const command = new GetObjectCommand(objectParams)
        const imageUrl = await getSignedUrl(s3, command, { expiresIn: 3600 })
        return imageUrl
    } catch (error) {
        console.error(`AWS Fetching Error:", ${error}`)
    }
}

module.exports = {
    uploadImageToS3,
    fetchImageUrlFromS3,
}
