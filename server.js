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

function makeid() {
  var text = "";
  var possible = "0123456789";
  for( var i=0; i < 5; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

function zeroPad(num) {
  return num < 10 ? '0' + num : num;
}

function formatTime(date) {
  return (
    zeroPad(date.getHours()) + ':' +
    zeroPad(date.getMinutes()) + ':' +
    zeroPad(date.getSeconds())
  );
}

var nicks = Object.create(null);

io.on('connection', function(socket) {

  var nick = "Guest" + makeid();
  while (nicks[nick] !== undefined) {
    nick = "Guest" + makeid();
  };

  nicks[nick] = socket.id;
  socket.emit('nickChanged', {date: new Date(), nick: nick});

  console.log('[' + formatTime(new Date()) + '] ' + nick + ' connected');

  socket.on('disconnect', function() {
    delete nicks[nick];
    console.log('[' + formatTime(new Date()) + '] ' + nick + ' disconnected');
  });

  socket.on('sendMessage', function(body) {
    var msg = {
      nick: nick,
      date: new Date(),
      body: body
    };
    io.emit('peerSentMessage', msg);
    console.log('[' + formatTime(msg.date) + '] ' + msg.nick + ': ' + msg.body);
  });

  socket.on('changeNick', function(newNick) {
    if (nicks[newNick] !== undefined) {
      var msg = {
        date: new Date(),
        nick: newNick
      };
      socket.emit('nickTaken', msg);
      console.log('[' + formatTime(msg.date) + '] nick "' + nick + '" is taken!');
      return
    }

    var oldNick = nick;
    delete nicks[oldNick];
    nicks[newNick] = socket.id;
    nick = newNick;

    socket.emit('nickChanged', {date: new Date(), nick: nick});

    var msg = {
      date: new Date(),
      oldNick: oldNick,
      newNick: nick,
    };
    io.emit('peerChangedNick', msg);

    console.log('[' + formatTime(msg.date) + '] "' + oldNick + '" changed nick to "' + nick + '"');
  });
});

http.listen(port, function() {
  console.log('Server running on port ' + port);
});
