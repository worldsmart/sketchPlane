const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const path = require('path');

const port = 3228;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "404")));

app.post('*/newuser',(req,res)=>{
	res.json(req.body);
});

app.post('*/data',(req,res)=>{
	res.json(req.body);
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