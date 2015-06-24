var express = require('express');
var path = require('path');
var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer();
var app = express();
var http = require('http').Server(app);

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? 8080 : 3001;
var publicPath = path.resolve(__dirname, 'public');

var util = require('util');

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

function randomNick() {
  var nick = 'Guest';
  var possible = '0123456789';
  for( var i=0; i < 5; i++ )
    nick += possible.charAt(Math.floor(Math.random() * possible.length));
  return nick;
}

function message(msg) {
  msg.date = msg.date || new Date();
  return msg;
}

var nicks = Object.create(null);

io.on('connection', function(socket) {

  do { var nick = randomNick(); }
  while (nicks[nick] !== undefined);

  nicks[nick] = socket.id;

  socket.emit('nickChanged', message({nick: nick}));
  io.emit('peerConnected', message({nick: nick}));

  util.log(nick + ' connected');

  socket.on('disconnect', function() {
    delete nicks[nick];

    io.emit('peerDisconnected', message({nick: nick}));

    util.log(nick + ' disconnected');
  });

  socket.on('sendMessage', function(body) {
    io.emit('peerSentMessage', message({nick: nick, body: body}));

    util.log(nick + ': ' + body);
  });

  socket.on('changeNick', function(newNick) {

    if (nicks[newNick] !== undefined) {
      socket.emit('nickTaken', message({nick: newNick}));

      util.log('nick "' + newNick + '" is taken!');

      return
    }

    var oldNick = nick;
    delete nicks[oldNick];
    nicks[newNick] = socket.id;
    nick = newNick;

    socket.emit('nickChanged', message({nick: nick}));
    io.emit('peerChangedNick', message({oldNick: oldNick, newNick: nick}));

    util.log('"' + oldNick + '" changed nick to "' + nick + '"');
  });

  socket.on('getPeerList', function() {
    var users = [];
    for (var user in nicks) {
      users.push(user);
    }

    socket.emit('peerList', message({users: users}));

    util.log('sent peer list to "' + nick + '"');
  });
});

http.listen(port, function() {
  console.log('Server running on port ' + port);
});
