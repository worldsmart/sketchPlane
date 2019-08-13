const router = require('express').Router();
const path = require('path');

const user = require('./user.js');
router.use('/api/user',user);

const offtop = require('./offtop.js');
router.use('/api/offtop',offtop);

router.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','index.html'));
});

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, "404", "404.html"));
});

module.exports = router;