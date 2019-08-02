const jwt = require('jsonwebtoken');
const key = 'kh3wh4g534k57l';

module.exports.token = (data)=>{
    return new Promise(resolve => {
        jwt.sign(data,key,(err,t)=>{
            if(err) resolve();
            else resolve(t);
        });
    });
};

module.exports.decode = (token)=>{
    return new Promise(resolve => {
        jwt.verify(token, key, (err, decode)=>{
            if(err) resolve();
            else resolve(decode);
        });
    });
};