import MicroEvent from 'microevent';

export default function MessageStore() {
  this.items = [];
}

MessageStore.prototype.getAll = function() {
  return this.items;
}

MicroEvent.mixin(MessageStore);

var messageStore = new MessageStore();
export { messageStore }
