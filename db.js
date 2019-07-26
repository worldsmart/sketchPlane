const { Client } = require('pg');
const connectionString = 'postgresql://postgres:rpg10@localhost:5432/postgres';

const client = new Client({
    connectionString: connectionString,
});
client.connect();
client.query('SELECT NOW()', (err, res) => {
    console.log(res['rows'][0]['now']);
});

module.exports.email_verify = function (data){
    var tmp = [data['email']];
     return client.query('SELECT * FROM users WHERE email = $1', tmp);
}

module.exports.new_user = function (data){
    var tmp = [data['name'],data['email'],data['pass'],new Date()];
    return client.query('INSERT INTO users(name, email, password, reg_date) VALUES($1, $2, $3, $4)',tmp);
 }