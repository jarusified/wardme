var fs = require('fs');
var http = require('http');
var file = fs.readFileSync("app.html");
var fav  = fs.readFileSync("favicon.ico");
var port = process.env.PORT || 3000;
var server = http.createServer(function(req, res){
  if(req.url == '/favicon.ico'){
    res.writeHead(200, '{Content-Type: image/x-icon}'); 
    res.write(fav);
  }else{
    res.writeHead(200, '{Content-Type: text/html}');
    res.write(file);
  }
  res.end();
}).listen(port);
var io = require("socket.io").listen(server, {log:false});
io.sockets.on('connection', function (socket) {
  socket.on('coords', function (data) {
    io.sockets.emit('update', data);
  });
});
