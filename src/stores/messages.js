import Reflux from 'reflux';

import actions from '../actions';

var messages = [];

export default Reflux.createStore({
  init: function() {
    this.listenTo(actions.peerSentMessage, this.onPeerSentMessage);
    this.listenTo(actions.peerChangedNick, this.onPeerChangedNick);
    this.listenTo(actions.nickTaken, this.onNickTaken);
  },

  onPeerSentMessage: function(msg) {
    msg.type = 'message';
    messages.push(msg);
    this.trigger(messages);
  },

  onPeerChangedNick: function(msg) {
    msg.type = 'nickChange';
    messages.push(msg);
    this.trigger(messages);
  },

  onNickTaken: function(msg) {
    msg.type = 'nickTaken';
    messages.push(msg);
    this.trigger(messages);
  }
});
