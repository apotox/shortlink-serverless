'use strict';

const fs = require('fs')
const path = require('path')
const util = require('util');
var mime = require('mime-types')
const { failed } = require('../helpers/responses');

const read = util.promisify(fs.readFile)
var cache = {}

module.exports.handler = async (event,context,callback) => {

    const filename = event.path.substring(1) || 'index.html'

    if(!cache[filename]){
      try {
        cache[filename] = await read(path.join(__dirname,'../static/',filename),'utf-8')
      }catch{
        return failed({message: 'not found!',filename},404)
      }
    }

  return {
    statusCode: 200,
    body: cache[filename],
    headers:{
        'Content-Type': mime.lookup(filename)
    }
  };
};

