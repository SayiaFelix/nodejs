var http = require('http');
var module1 = require('./module1')
let module2 = require('./module2')
function onRequest(req, res){
 res.writeHead(200,{ 'content-type': 'text/plain'});
 res.write(module2.manchester);
  module2.myFunction()
 res.end()
}

http.createServer(onRequest).listen(8000);