import Reflux from 'reflux';
import io from 'socket.io-client';

function d(info) {
  info.date = new Date(info.date);
  return info;
}

let socket = io();

let actions = Reflux.createActions([
  'changeNick',
  'nickChanged',
  'nickTaken',

  'sendMessage',
  'getPeerList',
  'peerListReceived',

  'peerConnected',
  'peerDisconnected',
  'peerChangedNick',
  'peerSentMessage',
]);

actions.changeNick.listen(function(nick) {
  socket.emit('changeNick', nick);
});

actions.sendMessage.listen(function(msg) {
  socket.emit('sendMessage', msg);
});

actions.getPeerList.listen(function() {
  socket.emit('getPeerList');
});

socket.on('peerList', function(info) {
  actions.peerListReceived(d(info));
});

socket.on('nickChanged', function(info) {
  actions.nickChanged(d(info));
});

socket.on('nickTaken', function(info) {
  actions.nickTaken(d(info));
});

socket.on('peerConnected', function(info) {
  actions.peerConnected(d(info));
});

socket.on('peerDisconnected', function(info) {
  actions.peerDisconnected(d(info));
});

socket.on('peerChangedNick', function(info) {
  actions.peerChangedNick(d(info));
});

socket.on('peerSentMessage', function(info) {
  actions.peerSentMessage(d(info));
});

export default actions;
