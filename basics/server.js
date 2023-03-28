
var http = require('http');
var app = require('./javascriptModule/app');


http.createServer(app.handleRequest).listen(8000);;

