'use strict';

const { success, failed, forwardIt } = require('../helpers/responses')
const TableName = process.env.TABLE_LINKS
const dynamodb = require('../helpers/db-client')

module.exports.handler = async (event) => {

    const { linkId } = event.pathParameters;


    return dynamodb.get({
        TableName,
        Key: {
            linkId
        }
    }).promise()
        .then(result=>{


            return forwardIt(result.Item.linkUrl)

        })
        .catch(failed)

};
