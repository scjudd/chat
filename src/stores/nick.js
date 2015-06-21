import Reflux from 'reflux';

import actions from '../actions';

var nick = undefined;

export default Reflux.createStore({
  init: function() {
    this.listenTo(actions.nickChanged, this.onChange);
    this.listenTo(actions.nickTaken, this.onTaken);
  },

  onChange: function(newNick) {
    nick = newNick;
    this.trigger(nick);
  },

  onTaken: function() {
    this.trigger(nick);
  }
});
