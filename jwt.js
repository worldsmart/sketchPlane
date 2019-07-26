var jwt = require('jsonwebtoken');

const key = 'kh3wh4g534k57l';

module.exports.token = function (data) {
    return jwt.sign(data,key);
}