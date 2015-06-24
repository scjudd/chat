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
    actions.getPeerList();
  },

  onPeerDisconnected: function(info) {
    actions.getPeerList();
  },

  onPeerChangedNick: function(info) {
    actions.getPeerList();
  }
});
