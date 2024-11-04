const crypto = require('crypto');
const num = crypto.randomBytes(256).toString('base64');
console.log(num)