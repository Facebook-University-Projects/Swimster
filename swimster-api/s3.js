const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const { getAwsS3Info } = require('./config')

const s3BucketInfo = getAwsS3Info()

const s3 = new S3Client({ region: s3BucketInfo.bucketRegion })

