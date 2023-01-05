"use strict";
const AWS = require("aws-sdk");

const fetchItem = async (event) => {
  //module.exports.fetchItem = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const {id} = event.pathParameters //pegar uma varável que vem do evento

    let item;

    try {
        const result = await dynamodb.get({
            TableName: "ItemTable",
            Key: {id}
        }).promise(); //passando dois parâmetros e usando o id como chave

        item = result.Item;

    } catch (error) {
        console.log(error)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(item),
    };
};

module.exports = {
    handler: fetchItem,
};
