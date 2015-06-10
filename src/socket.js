import io from 'socket.io-client';
import { AppDispatcher } from './dispatcher';

var socket = io();

socket.on('message-received', function(msg) {
  AppDispatcher.dispatch({
    eventName: 'message-received',
    message: msg
  });
});

export { socket }
