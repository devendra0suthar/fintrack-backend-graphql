const AWS = require('aws-sdk')

module.exports.handler = async (event) => {
    const bucket = event.arguments.bucket
    const key = event.arguments.key
    console.log(bucket, key)
    const client = new AWS.Rekognition();

    const params = {
        Image: {
            S3Object: {
                Bucket: bucket,
                Name: key
            },
        },
    }

    client.detectText(params, function (err, response) {
        console.log(response)

        console.log(err)
        if (err) {
            return {
                data: {
                },
                description: err || "internal server error",
                status: true

            }
        } else {
            return {
                total: response.TextDetections[0].DetectedText
            }
        }
    })
}