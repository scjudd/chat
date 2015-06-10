import { Dispatcher } from 'flux';
import { messageStore } from './stores/messages';
import { nickStore } from './stores/nick';
import { socket } from './socket';

var AppDispatcher = new Dispatcher();

AppDispatcher.register(function(payload) {
  switch(payload.eventName) {
    case 'message-sent':
      socket.emit('message-sent', payload.message);
      break;

    case 'message-received':
      messageStore.items.push(payload.message);
      messageStore.trigger('change');
      break;

    case 'change-nick':
      socket.emit('change-nick', payload.nick);
      break;

    case 'nick-changed':
      messageStore.items.push(payload.message);
      messageStore.trigger('change');
      break;

    case 'nick-set':
      nickStore.nick = payload.nick;
      nickStore.trigger('change');
      break;

    case 'nick-taken':
      messageStore.items.push(payload.message);
      messageStore.trigger('change');
      nickStore.trigger('change');
      break;
  }
  return true;
});

export { AppDispatcher }
