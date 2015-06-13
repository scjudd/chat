import MicroEvent from 'microevent';

function NickStore() {
  this.nick = "";
}

NickStore.prototype.get = function() {
  return this.nick;
};

NickStore.prototype.set = function(newNick) {
  this.nick = newNick;
};

MicroEvent.mixin(NickStore);

export default new NickStore()
