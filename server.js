var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer();
var app = express();
var http = require('http').Server(app);

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? 8080 : 3001;
var publicPath = path.resolve(__dirname, 'public');

app.use(express.static(publicPath));

if (!isProduction) {
  var bundle = require('./server/bundle.js');
  bundle();

  app.all('/build/*', function(req, res) {
    proxy.web(req, res, {
      target: 'http://localhost:8080'
    });
  });
}

proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

var io = require('socket.io')(http);

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
  socket.on('message-sent', function(msg) {
    io.emit('message-received', msg);
    console.log('message: ' + msg.body);
  });
});

http.listen(port, function() {
  console.log('Server running on port ' + port);
});
