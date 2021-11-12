const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB()
const { v4: uuidv4 } = require('uuid');

module.exports.handler = async (event) => {
    const id = uuidv4()
    const reciept = event.arguments.reciept
    const date = event.arguments.date
    const amount = event.arguments.amount
    const categoryId = event.arguments.categoryId
    const userId = event.arguments.userId

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
            "categoryId": {
                S: categoryId
            },
            "userId": {
                S: userId
            }
        },
        ReturnConsumedCapacity: "TOTAL",
        TableName: process.env.EXPENSE_TABLE_NAME
    }
    console.log({
        date,
        amount,
        reciept,
        categoryId,
        userId
    })
    return dynamodb.putItem(params).promise()
        .then(data => {
            return {
                date,
                amount,
                reciept,
                categoryId,
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