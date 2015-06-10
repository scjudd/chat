import MicroEvent from 'microevent';

export default function NickStore() {
  this.nick = "";
}

NickStore.prototype.get = function() {
  return this.nick;
}

MicroEvent.mixin(NickStore);

var nickStore = new NickStore();
export { nickStore }
