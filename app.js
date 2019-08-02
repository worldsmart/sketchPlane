const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./routes/router.js');

const port = 3228;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "404")));

app.use('/', router);

app.listen(port,()=>{
console.log("Server started on port: " + port + " | " + new Date().toTimeString());
});