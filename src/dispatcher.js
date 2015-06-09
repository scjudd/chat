import { Dispatcher } from 'flux';
import { messageStore } from './stores/messages';

var AppDispatcher = new Dispatcher();

AppDispatcher.register(function(payload) {
  switch(payload.eventName) {
    case 'message-sent':
      messageStore.items.push(payload.message);
      messageStore.trigger('change');
      break;
    case 'message-received':
      messageStore.items.push(payload.message);
      messageStore.trigger('change');
      break;
  }
  return true;
});

export { AppDispatcher }
