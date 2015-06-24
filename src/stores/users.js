import Reflux from 'reflux';

import KVFns from '../../common/keyvalue';
import actions from '../actions';

let users = [];

export default Reflux.createStore({
  init: function() {
    this.listenTo(actions.peerListReceived, this.onPeerListReceived);
    this.listenTo(actions.peerConnected, this.onPeerConnected);
    this.listenTo(actions.peerDisconnected, this.onPeerDisconnected);
    this.listenTo(actions.peerChangedNick, this.onPeerChangedNick);
  },

  onPeerListReceived: function(info) {
    users = info.users;
    this.trigger(users);
  },

  onPeerConnected: function(info) {
    KVFns.push.call(users, info.nick, info.peeruuid);
    this.trigger(users);
  },

  onPeerDisconnected: function(info) {
    KVFns.delete.call(users, info.nick);
    this.trigger(users);
  },

  onPeerChangedNick: function(info) {
    KVFns.delete.call(users, info.oldNick);
    KVFns.push.call(users, info.newNick, info.peeruuid);
    this.trigger(users);
  }
});
