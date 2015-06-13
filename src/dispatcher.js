import { Dispatcher } from 'flux';
import MessageStore from './stores/messages';
import NickStore from './stores/nick';
import socket from './socket';

let AppDispatcher = new Dispatcher();

AppDispatcher.register(payload => {
  switch(payload.eventName) {
    case 'message-sent':
      socket.emit('message-sent', payload.message);
      break;

    case 'message-received':
      MessageStore.push(payload.message);
      MessageStore.trigger('change');
      break;

    case 'change-nick':
      socket.emit('change-nick', payload.nick);
      break;

    case 'nick-changed':
      MessageStore.push(payload.message);
      MessageStore.trigger('change');
      break;

    case 'nick-set':
      NickStore.set(payload.nick);
      NickStore.trigger('change');
      break;

    case 'nick-taken':
      MessageStore.push(payload.message);
      MessageStore.trigger('change');
      NickStore.trigger('change');
      break;
  }
  return true;
});

export default AppDispatcher
