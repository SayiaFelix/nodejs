var url = require('url');
var fs = require('fs');

function renderHtml(path,res){
    fs.readFile(path,null,function(err,data){
        if (err){
              res.writeHead(400);
              res.write('File not found')
          }else{
              res.write(data)
          }
          res.end();
       })
}

module.exports ={
    handleRequest: function(req, res){
        res.writeHead(200,{'Content-Type': 'text/html'});
        var path = url.parse(req.url).pathname;
        switch(path){
            case '/':
                renderHtml('./index.html',res);
                break;
            case '/login':
                renderHtml('./login.html',res);
                break;
            default:
                res.writeHead(404);
                res.write('Route Not Found');
                res.end();
        }

    }



}