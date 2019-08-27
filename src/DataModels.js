const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const url = 'mongodb://mongo:rpg10rpg10@ds016108.mlab.com:16108/sketchplane';

mongoose.connect(url, {useNewUrlParser: true}, err=>{
    if (err) console.log('Mongo DB connection error:' + err.name);
    else console.log('Mongo DB successfuly connected');
});

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:String,
    email:String,
    password:String,
    date:{type:Date, default: Date.now()},
    description:{type:String, default: ''},
    country:{type:String, default: ''},
    avatar:{type:String, default: ''},
    role:{type:Number, default: 0}
});

module.exports.user = user = mongoose.model('users', userSchema);

const postSchema = new Schema({
    owner:String,
    timestamp:{type:Date,default:Date.now()},
    title:String,
    text:String
});

module.exports.post = post = mongoose.model('posts', postSchema);