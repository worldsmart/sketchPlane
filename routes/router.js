const router = require('express').Router();
const path = require('path');

const user = require('./user.js');
router.use('/user',user);

router.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','index.html'));
});

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, "404", "404.html"));
});

module.exports = router;