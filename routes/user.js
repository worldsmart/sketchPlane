const router = require('express').Router();
const db = require('../src/db.js');
const jwt = require('../src/jwt.js');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, req.body['Authorization'] + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/svg' || file.mimetype === 'image/gif') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3
    },
    fileFilter: fileFilter
});

router.post('/new', (req,res)=>{
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z@$!%*#?&\d]{8,32}$/.test(req.body.pass) || !/^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/.test(req.body.email) || !/^[A-z0-9]{3,32}$/.test(req.body.name)) {res.json({'err':'bad data'});return;}
    else db.email_verify(req.body['email']).then((e)=>{
        if(e) res.json({'err':'Email already taken'});
        else db.create_new(req.body).then(()=>{
            let tmp = {
                'email':req.body['email'],
                'pass':req.body['pass']
            };
            jwt.token(tmp).then(token=>{
                if(token){
                    res.json({'jwt':token});
                }else res.json({'err':'Server err'});
            })
        }).catch(e=>{res.json({'err':e})});
    });
});

router.post('/login', (req,res)=>{
    const tmp = {
        'email':req.body['email'],
        'pass':req.body['password']
    };
    db.get(tmp).then(r=>{
        jwt.token(tmp).then(token=>{
            if(token){
                res.json({'jwt':token});
            }else res.json({'err':'Server err'});
        });
    }).catch(e=>{res.json({'err':e})});
});

router.get('/data',(req,res)=>{
    jwt.decode(req.headers.authorization).then((user)=>{
        if(user){
            db.get(user).then(r=>{
                delete r['password'];
                r['reg_date'] = r['reg_date'].getDay() + '.'+ r['reg_date'].getDate() + '.' + r['reg_date'].getFullYear();
                fs.readFile(path.join(__dirname + '/..' + '/uploads/' + r['avatar']), 'base64', (err,data)=>{
                    if(err){
                        delete r['avatar'];
                    } else {
                        r['avatar'] = data;
                    }
                    res.json(r);
                });
            }).catch(e=>{res.json({'err':e})});
        }else res.json({'err':'Server err'});
    });
});

router.post('/edit', (req,res)=>{
    if((req.body.pass && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z@$!%*#?&\d]{8,32}$/.test(req.body.pass)) || (req.body.email && !/^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/.test(req.body.email)) || (req.body.name && !/^[A-z0-9]{3,32}$/.test(req.body.name))) {res.json({'err':'bad data'});return;}
    db.email_verify(req.body['email']).then((e)=>{
        if(e) res.json({'err':'Email already taken'});
        else jwt.decode(req.headers.authorization).then((user)=>{
            if(user){
                db.update(user,req.body).then((r)=>{
                    jwt.token(r).then(token=>{
                        if(token){
                            res.json({'jwt':token});
                        }else res.json({'err':'Server err'});
                    }).catch(e=>{res.json({'err':e})});
                }).catch(e=>{res.json({'err':e})});
            }else res.json({'err':'Server err'});
        });
    });

});

router.post('/save_avatar', upload.single('avatar'),(req,res)=>{
    if(!req.file){
        res.json({'err':'No file'});
        return;
    }
    jwt.decode(req.body['Authorization']).then(r=>{
        if(!r){
            res.json({'err':'Server err'});
        } else {
            db.save_avatar(req.file['filename'], r['email']).then(r=>{
                if(r['err']){
                    res.json({'err':'Db err'});
                }else if(r['data'][0]){
                    fs.unlink(path.join(__dirname + '/..' + '/uploads/' + r['data'][0]['avatar']), (err)=>{
                        res.json({'success':true});
                    });
                } else res.json({'success':true});

            });
        }
    });
});

router.post('/email_verify',(req,res)=>{
    db.email_verify(req.body['email']).then(r=>{
        if (!r){
            res.json({'err':''});
        } else res.json({'err':'*Email already taken'});
    });
});

module.exports = router;