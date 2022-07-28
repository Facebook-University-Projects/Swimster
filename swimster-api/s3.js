const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const { getAwsS3Info } = require('./config')

const s3BucketInfo = getAwsS3Info()

const s3 = new S3Client({ region: s3BucketInfo.bucketRegion })

// converts readableStream to string
const streamToStr = stream => new Promise((resolve, reject) => {
    const chunks = []
    stream.on("data", chunk => chunks.push(chunk))
    stream.on("error", reject)
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")))
})

// uploads an image to s3
const uploadImageToS3 = async image => {
    try {
        const uploadParams = {
            Bucket: s3BucketInfo.bucketName,
            Key: image.filename,
            Body: image.path,
        }
        const result = await s3.send(new PutObjectCommand(uploadParams))
        console.log('result: ', result);
        return result
    } catch (error) {
        console.log("AWS Uploading Error:", error)
    }
}

// gets an image from s3
const fetchImageFromS3 = async imageKey => {
    try {
        const uploadParams = {
            Bucket: s3BucketInfo.bucketName,
            Key: imageKey,
        }
        const result = await s3.send(new GetObjectCommand(uploadParams))
        console.log('result: ', result);
        const bodyContents = await streamToStr(result.Body)
        console.log('bodyContents: ', bodyContents);
        return bodyContents
    } catch (error) {
        console.log("AWS Fetching Error:", error)
    }
}

module.exports = {
    uploadImageToS3,
    fetchImageFromS3,
}
