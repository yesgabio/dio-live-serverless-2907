"use strict";
const AWS = require("aws-sdk");

const fetchItems = async (event) => {
  //module.exports.fetchItems = async (event) => {

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    let items;
    // listar os resultados dos itens
    try {
        const results = await dynamodb.scan({ //cuidar o scan com o tamanho da tabela
            TableName: "ItemTable"
        }).promise();

        items = results.Items;

    } catch (error) {
        console.log(error)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(items),
    };
};
//exportação da função
module.exports = {
    handler: fetchItems,
};
