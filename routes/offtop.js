const router = require('express').Router();
const jwt = require('./../src/jwt.js');
const db = require('./../src/db.js');
const fs = require('fs');
const path = require('path');

let sockets = [];

router.get('/get_post',(req,res)=>{
    db.get_post(req.headers.authorization).then(posts=>{
        loop(posts, 0);
        function loop(posts, post, tmp = []){
            let template = {
                'title':posts[post]['title'],
                'text':posts[post]['text'],
                'id':posts[post]['_id'],
                'date':posts[post]['timestamp'].getMinutes() + ':' + posts[post]['timestamp'].getHours() + ' ' + posts[post]['timestamp'].getDate() + '.' + posts[post]['timestamp'].getDay() + '.' + posts[post]['timestamp'].getFullYear(),
                'owner':posts[post]['name']
            };
            fs.readFile(path.join(__dirname + '/..' + '/uploads/' + posts[post]['avatar']), 'base64',(err,data)=>{
                if(err || !data) {
                    template['avatar'] = './assets/img/default.svg';
                    tmp.push(template);
                }
                else {
                    template['avatar'] = 'data:image/jpeg;base64,' + data;
                    tmp.push(template);
                }
                if(posts.length == post + 1) {res.json({'data':tmp});}
                else loop(posts, ++post, tmp);
            });
        }
    }).catch(err=>{res.json({'err':'Db error'})});
});



router.ws('/echo', function(ws, req) {
    sockets.push(ws);
    ws.on('message', function(msg) {
        msg = JSON.parse(msg);
        if(msg['type'] == 'new_post'){
            msg = msg['data'];
            if(!msg['post']['title'] || !msg['post']['text']) return;
            jwt.decode(msg['jwt']).then(r=>{
                if(!r) return;
                else {
                    db.get(r).then(user=>{
                        if(!user)return;
                        else {
                            db.new_post(user, msg['post']).then((r)=>{
                                sockets.forEach(socket=>{
                                    let tmp = {
                                        'title':msg['post']['title'],
                                        'text':msg['post']['text'],
                                        'date':r['date'].getMinutes() + ':' + r['date'].getHours() + ' ' + r['date'].getDate() + '.' + r['date'].getDay() + '.' + r['date'].getFullYear(),
                                        'id':r['id'],
                                        'owner':user['name']
                                    };
                                    fs.readFile(path.join(__dirname + '/..' + '/uploads/' + user['avatar']), 'base64',(e, data)=>{
                                        if(e || !data) tmp['avatar'] = './assets/img/default.svg';
                                        else tmp['avatar'] = 'data:image/jpeg;base64,' + data;
                                        socket.send(JSON.stringify(tmp));
                                    });
                                });
                            }).catch(err=>{if(err)return;})
                        }
                    }).catch(err=>{if(err)return;})
                }
            });
        }
    });
    ws.on('close', () => {
        sockets = sockets.filter(conn => {
            return (conn === ws) ? false : true;
        });
    });
});

module.exports = router;