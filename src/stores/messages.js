import MicroEvent from 'microevent';

function MessageStore() {
  this.items = [];
}

MessageStore.prototype.getAll = function() {
  return this.items;
};

MessageStore.prototype.push = function(msg) {
  this.items.push(msg);
};

MicroEvent.mixin(MessageStore);

export default new MessageStore()
