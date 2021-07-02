'use strict';

const { success, failed } = require('../helpers/responses')
const generator = require("../helpers/generate-linkid")
const TableName = process.env.TABLE_LINKS
const dynamodb = require('../helpers/db-client')

module.exports.handler = async (event) => {

    const { linkUrl } = JSON.parse(event.body)
    const linkId = generator()

    const Item = {
        linkId,
        linkUrl,
        addedAt: new Date().toISOString()
    };

    return dynamodb
        .put({
            TableName,
            Item,
        })
        .promise()
        .then(_=>{
            return success({linkId})
        })
        .catch(failed);

};
