const { Client } = require('pg');
const connectionString = 'postgresql://postgres:rpg10@localhost:5432/postgres';

const client = new Client({
    connectionString: connectionString,
});
client.connect();
client.query('SELECT NOW()', (err, res) => {
    console.log(res['rows'][0]['now']);
});

module.exports.create_new = (user)=>{
    return new Promise(((resolve, reject) => {
        let tmp = [user['name'],user['email'],user['pass'],new Date()];
        client.query('INSERT INTO users(name, email, password, reg_date) VALUES($1, $2, $3, $4)', tmp, (err)=>{
            if(err){
                reject('Database error');
            }
            else resolve();
        });
    }));
};

module.exports.get = get = (candidate)=>{
    return new Promise((resolve, reject) => {
        let tmp = [candidate['email'], candidate['pass']];
        client.query('SELECT * FROM users WHERE email = $1 and password = $2',tmp, (err,res)=>{
            if(err) reject('Database error');
            else if(!res['rows'][0]) reject('Wrong login or password');
            else resolve(res['rows'][0]);
        });
    });
};

module.exports.update = (user,new_data)=>{
    return new Promise((resolve, reject) => {
        get(user).then(r=>{
            let tmp = {
                'email':r['email'],
                'pass':r['password']
            };
            if(new_data['email']){
                client.query('UPDATE users SET email = $1 WHERE id = $2', [new_data['email'], r['id']], (err)=>{
                    if(err) reject('Db error');
                });
                tmp.email = new_data['email'];
            }
            if(new_data['name']){
                client.query('UPDATE users SET name = $1 WHERE id = $2', [new_data['name'], r['id']], (err)=>{
                    if(err) reject('Db error');
                });
            }
            if(new_data['password']){
                client.query('UPDATE users SET password = $1 WHERE id = $2', [new_data['password'], r['id']], (err)=>{
                    if(err) reject('Db error');
                });
                tmp.pass = new_data['password'];
            }
            if(new_data['description']){
                client.query('UPDATE users SET description = $1 WHERE id = $2', [new_data['description'], r['id']], (err)=>{
                    if(err) reject('Db error');
                });
            }
            if(new_data['country']){
                client.query('UPDATE users SET country = $1 WHERE id = $2', [new_data['country'], r['id']], (err)=>{
                    if(err) reject('Db error');
                });
            }
            resolve(tmp);
        }).catch(e=>{reject(e);});
    });
};

module.exports.save_avatar = (dist, email)=>{
    return new Promise(resolve => {
        client.query('SELECT avatar FROM users WHERE email = $1', [email], (e,r)=>{
            client.query('UPDATE users SET avatar = $1 WHERE email = $2',[dist,email], (err)=>{
                if(err){
                    resolve({'err':true});
                }else resolve({'data':r['rows']});
            });
        });
    });
};

module.exports.email_verify = email_verify = (email)=>{
    return new Promise(resolve => {
        client.query('SELECT * FROM users WHERE email = $1',[email], (err,res)=>{
            if(res['rows'][0]) resolve(true);
            else resolve(false);
        });
    });
};