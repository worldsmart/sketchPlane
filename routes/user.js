const router = require('express').Router();
const db = require('../src/db.js');
const jwt = require('../src/jwt.js');

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
    db.get(req.body).then(r=>{
        let tmp = {
            'email':r['email'],
            'pass':r['password']
        };
        jwt.token(tmp).then(token=>{
            if(token){
                res.json({'jwt':token});
            }else res.json({'err':'Server err'});
        })
    }).catch(e=>{res.json({'err':e})});
});

router.get('/data',(req,res)=>{
    jwt.decode(req.headers.authorization).then((user)=>{
        if(user){
            db.get(user).then(r=>{
                res.json(r);
            }).catch(e=>{res.json({'err':e})});
        }else res.json({'err':'Server err'});
    });
});

router.post('/edit',(req,res)=>{
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

module.exports = router;