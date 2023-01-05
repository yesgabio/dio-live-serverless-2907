"use strict";

const AWS = require("aws-sdk")

const updateItem = async (event) => {

  const {itemStatus} = JSON.parse(event.body); //o que vai ser atualizado
  const {id} = event.pathParameters //o identificador que vai ser atualizado

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  await dynamodb.update({
    TableName: "ItemTable",
    Key: {id},
    UpdateExpression: 'set itemStatus = :itemStatus',
    ExpressionAttributeValues: {
      ':itemStatus': itemStatus
    },
    ReturnValues: "ALL_NEW"
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(
      { msg: 'Item updated'}
    ),
  };
};


module.exports = {
    handler:updateItem
}


