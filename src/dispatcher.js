import { Dispatcher } from 'flux';
import { messageStore } from './stores/messages';
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
  }
  return true;
});

export { AppDispatcher }
