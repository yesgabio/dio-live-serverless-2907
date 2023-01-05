"use strict";

const {v4} = require("uuid");
const AWS = require("aws-sdk")

const insertItem = async (event) => {
//module.exports.insertItem = async (event) => {

  const {item} = JSON.parse(event.body);
  const createdAt = new Date().toISOString(); //adicionando a data de criação
  const id = v4()

  const dynamodb = new AWS.DynamoDB.DocumentClient(); //iniciando a dynamodb para incluir os dados

  const newItem = {
    id,
    item,
    createdAt,
    itemStatus: false
  }

  await dynamodb.put({
    TableName: "ItemTable", //exatamente o mesmo nome criado anteriormente na serverless
    Item: newItem
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(newItem),
  };
};


module.exports = {
    handler:insertItem
}


