const AWS = require('aws-sdk')

const options = process.env.NODE_ENV == 'development' ?
    {
        region: process.env.AWS_REGION,
        endpoint: "http://localhost:8000"
    } : {}
    
module.exports = new AWS.DynamoDB.DocumentClient(options)

