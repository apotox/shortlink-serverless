'use strict';

module.exports.handler = async (event) => {

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v2.0!'
      },
      null,
      2
    ),
  };
};
