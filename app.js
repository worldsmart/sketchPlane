const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const db = require('./db.js');

const port = 3228;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "404")));

app.post('/api/data',(req,res)=>{
	db.new_user(req.body);
	res.json(req.body);
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