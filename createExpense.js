const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB()
const { v4: uuidv4 } = require('uuid');

module.exports.handler = async (event) => {
    console.log(event.arguments)
    const id = uuidv4()
    const reciept = event.arguments.reciept
    const date = event.arguments.date
    const amount = event.arguments.amount
    const categoryName = event.arguments.categoryName
    const userId = event.arguments.userId
    const createdAt = Date()
    const params = {
        Item: {
            "id": {
                S: id
            },
            "date": {
                S: date
            },
            "amount": {
                N: amount.toString()
            },
            "reciept": {
                S: reciept
            },
            "categoryName": {
                S: categoryName
            },
            "userId": {
                S: userId
            },
            "createdAt": {
                S: createdAt
            }
        },
        ReturnConsumedCapacity: "TOTAL",
        TableName: process.env.EXPENSE_TABLE_NAME
    }
    console.log({
        date,
        amount,
        reciept,
        categoryName,
        userId
    })
    return dynamodb.putItem(params).promise()
        .then(data => {
            return {
                date,
                amount,
                reciept,
                categoryName,
                userId
            }
        })
        .catch(err => {
            return {
                data: {
                },
                description: err || "internal server error",
                status: true

            }
        })
};