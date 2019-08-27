const router = require('express').Router();
const jwt = require('./../src/jwt.js');
const db = require('./../src/db.js');

router.get('/role-verify',(req,res)=>{
    jwt.decode(req.headers.authorization).then(r=>{
        if(!r) res.json({'success':false});
        else db.get(r).then(user=>{
            if(user['role'] && (user['role'] == 2 ||user['role'] == 1)) res.json({'success':true});
        }).catch(err =>{if(err) res.json({'success':false})});
    });
});



module.exports = router;