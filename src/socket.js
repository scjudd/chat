import io from 'socket.io-client';
import Dispatcher from './dispatcher';

let socket = io();

socket.on('message-received', msg => {
  Dispatcher.dispatch({
    eventName: 'message-received',
    message: {
      type: 'message',
      date: new Date(msg.date),
      nick: msg.nick,
      body: msg.body
    }
  });
});

socket.on('nick-changed', info => {
  Dispatcher.dispatch({
    eventName: 'nick-changed',
    message: {
      type: 'nick-changed',
      date: new Date(info.date),
      oldNick: info.oldNick,
      newNick: info.newNick
    }
  });
});

socket.on('nick-set', nick => {
  Dispatcher.dispatch({
    eventName: 'nick-set',
    nick: nick
  });
});

socket.on('nick-taken', info => {
  Dispatcher.dispatch({
    eventName: 'nick-taken',
    message: {
      type: 'nick-taken',
      date: new Date(info.date),
      nick: info.nick
    }
  });
});

export default socket
