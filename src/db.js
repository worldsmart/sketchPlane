const mongo = require('./DataModels.js');

module.exports.create_new = (user)=>{
    return new Promise(((resolve, reject) => {
        const newUser = new mongo.user({
            name:user['name'],
            email:user['email'],
            password:user['pass']
        });
        newUser.save().then((docs)=>{
            if(docs['_id']) resolve();
            else reject('Database error');
        });
    }));
};

module.exports.get = get = (candidate)=>{
    return new Promise((resolve, reject) => {
        mongo.user.findOne({email:candidate['email'],password:candidate['pass']},(err,user)=>{
            if(err) reject('Database error');
            else if(user) resolve(user);
            else reject('Wrong email or password');
        });
    });
};

module.exports.update = (user,new_data)=>{
    return new Promise((resolve, reject) => {
        get(user).then(r=>{
            let setter = {};
            for(let a in new_data){
                if(new_data[a])setter[a] = new_data[a];
            }
            mongo.user.findOneAndUpdate({email:r['email'], password:r['password']}, setter, {new : true} , (err,data)=>{
                if(err) reject('Database error');
                else resolve({email:data['email'],pass:data['password']})
            });
        }).catch(e=>{reject(e);});
    });
};

module.exports.save_avatar = (dist, user)=>{
    return new Promise(resolve => {
        mongo.user.findOne({email:user['email'], password:user['pass']}, (err,data)=>{
            if(err || !data) resolve({'err':true});
            else mongo.user.findOneAndUpdate({email:user['email'], password:user['pass']}, {avatar: dist}, {new : true} , (e,r)=>{
                if(e || !r) resolve({'err':true});
                else resolve({data:data['avatar']});
            });
        });
    });
};

module.exports.email_verify = email_verify = (email)=>{
    return new Promise(resolve => {
        user.findOne({email:email},(err,data)=>{
            if(err || data) resolve(true);
            else if(!data) resolve();
        });
    });
};

module.exports.new_post = (user,post)=>{
    return new Promise((resolve, reject) => {
        post['title'] = post['title'].substring(0,159);
        post['text'] = post['text'].substring(0,1079);
        post['title'] = post['title'].replace("<","(");
        post['title'] = post['title'].replace(">",")");
        post['text'] = post['text'].replace("<","fgsgf4d3634#%^");
        post['text'] = post['text'].replace(">","dsfhgd36dsfh34#%^");
        post['text'] = post['text'].replace("fgsgf4d3634#%^brdsfhgd36dsfh34#%^",'<br>');
        post['text'] = post['text'] = post['text'].replace("fgsgf4d3634#%^", "(");
        post['text'] = post['text'] = post['text'].replace("dsfhgd36dsfh34#%^", ")");
        const newPost = new mongo.post({
            owner:user['_id'],
            title:post['title'],
            text:post['text']
        });
        newPost.save().then(data=>{
            if(!data) reject("Db error");
            else resolve({
                'date':data['timestamp'],
                'id':data['_id']
            });
        });
    });
};

module.exports.get_post = (offset)=>{
    return new Promise((resolve, reject) => {
        mongo.post.find().sort({_id:-1}).skip(10 * offset).limit(10).then(data=>{
            if(!data) reject();
            else {
                let tmp = [];
                for(let a in data){
                    data[a] = data[a].toObject();
                    mongo.user.findOne({id:data['owner']}, (err,user)=>{
                        if(err || !user){
                            data[a].name = 'undefined';
                            data[a].avatar = '';
                        } else {
                            data[a].name = user['name'];
                            data[a].avatar = user['avatar'];
                        }
                        if(Number(a)+1 == data.length) resolve(data);
                    });
                }
            }
        });
    });
};