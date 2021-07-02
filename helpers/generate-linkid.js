const crypto = require('crypto')

module.exports = (len = 8) => crypto.randomBytes(len).toString('hex')