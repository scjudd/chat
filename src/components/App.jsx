import React from 'react';

import MessageList from './MessageList';
import MessageBar from './MessageBar';
import UserList from './UserList';

export default React.createClass({
  getInitialState: function() {
    return {
      msgListWidth: undefined,
      msgListHeight: undefined
    };
  },

  userListWidthUpdate: function(width) {
    this.setState({msgListWidth: window.innerWidth - width});
  },

  msgBarHeightUpdate: function(height) {
    this.setState({msgListHeight: window.innerHeight - height});
  },

  render: function() {
    return (
      <div>
        <UserList widthCallback={this.userListWidthUpdate} />
        <MessageList style={{width: this.state.msgListWidth, height: this.state.msgListHeight}} />
        <MessageBar heightCallback={this.msgBarHeightUpdate} />
      </div>
    );
  }
});
