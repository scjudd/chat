import Reflux from 'reflux';

import actions from '../actions';

var messages = [];

export default Reflux.createStore({
  init: function() {
    this.listenTo(actions.peerConnected, this.onPeerConnected);
    this.listenTo(actions.peerDisconnected, this.onPeerDisconnected);
    this.listenTo(actions.peerSentMessage, this.onPeerSentMessage);
    this.listenTo(actions.peerChangedNick, this.onPeerChangedNick);
    this.listenTo(actions.nickTaken, this.onNickTaken);
  },

  onPeerConnected: function(msg) {
    msg.type = 'peerConnected';
    messages.push(msg);
    this.trigger(messages);
  },

  onPeerDisconnected: function(msg) {
    msg.type = 'peerDisconnected';
    messages.push(msg);
    this.trigger(messages);
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
