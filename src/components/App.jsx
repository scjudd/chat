import React from 'react';

import MessageList from './MessageList';
import MessageBar from './MessageBar';
import UserList from './UserList';

export default React.createClass({
  render: function() {
    return (
      <div>
        <UserList />
        <MessageList />
        <MessageBar />
      </div>
    );
  }
});
