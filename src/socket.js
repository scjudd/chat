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

export { socket }
