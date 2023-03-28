var http = require('http');
let fs = require('fs');
let app = require('./app')
// var module1 = require('./module1')
// let module2 = require('./module2')

// function onRequest(req, res){
//  res.writeHead(200,{ 'content-type': 'text/html'});
//  fs.readFile('./index.html',null,function(err,data){
//   if (err){
//         res.writeHead(400);
//         res.write('File not found')
//     }else{
//         res.write(data)
//     }
//     res.end();
//  })
// //  res.write(module2.manchester);
//   module2.myFunction()
//  res.end()
// }

http.createServer(app.handleRequest).listen(8000);