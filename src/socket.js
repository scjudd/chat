import io from 'socket.io-client';
import { AppDispatcher } from './dispatcher';

var socket = io();

socket.on('message-received', function(msg) {
  msg.date = new Date(msg.date);
  AppDispatcher.dispatch({
    eventName: 'message-received',
    message: {
      type: 'message',
      date: new Date(msg.date),
      nick: msg.nick,
      body: msg.body
    }
  });
});

socket.on('nick-changed', function(info) {
  AppDispatcher.dispatch({
    eventName: 'nick-changed',
    message: {
      type: 'nick-changed',
      date: new Date(info.date),
      oldNick: info.oldNick,
      newNick: info.newNick
    }
  });
});

socket.on('nick-set', function(nick) {
  AppDispatcher.dispatch({
    eventName: 'nick-set',
    nick: nick
  });
});

socket.on('nick-taken', function(info) {
  AppDispatcher.dispatch({
    eventName: 'nick-taken',
    message: {
      type: 'nick-taken',
      date: new Date(info.date),
      nick: info.nick
    }
  });
});

export { socket }
