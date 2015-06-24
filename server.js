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
var KVFns = require('./common/keyvalue');

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

function makeUUID() {
  var i, random;
  var uuid = '';
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }
    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}

function message(msg, addUUID) {
  msg.date = msg.date || new Date();

  if (addUUID || addUUID === undefined) {
    msg.uuid = msg.uuid || makeUUID();
  }

  return msg;
}

var users = [];

io.on('connection', function(socket) {

  var uuid = makeUUID();

  do { var nick = randomNick(); }
  while (KVFns.get.call(users, nick) !== undefined);
  KVFns.push.call(users, nick, uuid);

  socket.emit('nickChanged', message({nick: nick}));
  io.emit('peerConnected', message({nick: nick, peeruuid: uuid}));

  util.log(nick + ' connected');

  socket.on('disconnect', function() {
    KVFns.delete.call(users, nick);

    io.emit('peerDisconnected', message({nick: nick, peeruuid: uuid}));

    util.log(nick + ' disconnected');
  });

  socket.on('sendMessage', function(body) {
    io.emit('peerSentMessage', message({nick: nick, body: body, peeruuid: uuid}));

    util.log(nick + ': ' + body);
  });

  socket.on('changeNick', function(newNick) {

    if (KVFns.get.call(users, newNick) !== undefined) {
      socket.emit('nickTaken', message({nick: newNick}));

      util.log('nick "' + newNick + '" is taken!');

      return
    }

    var oldNick = nick;
    KVFns.delete.call(users, oldNick);
    KVFns.push.call(users, newNick, uuid);
    nick = newNick;

    socket.emit('nickChanged', message({nick: nick}));
    io.emit('peerChangedNick', message({oldNick: oldNick, newNick: nick, peeruuid: uuid}));

    util.log('"' + oldNick + '" changed nick to "' + nick + '"');
  });

  socket.on('getPeerList', function() {
    socket.emit('peerList', message({users: users}, false));

    util.log('sent peer list to "' + nick + '"');
  });
});

http.listen(port, function() {
  console.log('Server running on port ' + port);
});
