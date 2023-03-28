// var http = require('http');

// function onRequest(request, response){
//  response.writeHead(200,{'Content-Type': 'text/plain'})
//  response.write('Hello World\n');
//  response.end()

// }

// http.createServer(onRequest).listen(8000);


var http = require('http');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('Hello Jaey Safu\n');
    res.end();
}).listen(8000);;

