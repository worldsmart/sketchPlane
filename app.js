const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const db = require('./db.js');
const jwt = require('./jwt.js');

const port = 3228;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "404")));

app.post('/api/new_user',(req,res)=>{
	if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z@$!%*#?&\d]{8,32}$/.test(req.body.pass) || !/^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/.test(req.body.email) || !/^[A-z0-9]{3,32}$/.test(req.body.name)) res.json({'err':'bad data'});
	db.new_user(req.body)
		.then(() => {
			res.json({'jwt':jwt.token(req.body),'name':req.body.name,'email':req.body.email});
		})
		.catch(e => {
			if(e['length'] >= 1)
			res.json({'err':e});
		});
});

app.post('/api/login',(req,res)=>{
	db.email_verify(req.body).then(async (r)=>{
		if(r['rows'][0] && r['rows'][0]['password'] == req.body.pass) {
			var tmp = {
				'name':r['rows'][0]['name'],
				'email':r['rows'][0]['email'],
				'pass':r['rows'][0]['password']
			};
			res.json({'jwt':jwt.token(tmp),'name':r['rows'][0]['name'],'email':r['rows'][0]['email']});
		}
		else res.json({'err':{'fb':'Wrong login or password'}});
	}).catch(e=>{
		if(e['length'] >= 1)
			res.json({'err':e});
	});
});

app.post('/api/validate_email', (req, res)=>{
	db.email_verify(req.body).then(async (r)=>{
		if(r['rows'][0]) res.json({'exists':true});
		else res.json({'exists':false})
	});
});

app.get('*',(req,res)=>{
	res.sendFile(path.join(__dirname,'client','dist','client','index.html'));
});

app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname, "404", "404.html"));
});

app.listen(port,()=>{
console.log("Server started on port: " + port + " | " + new Date().toTimeString());
});