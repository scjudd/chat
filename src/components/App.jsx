import React from 'react';

import MessageList from './MessageList';
import MessageBar from './MessageBar';

export default React.createClass({
  render: function() {
    return (
      <div>
        <MessageList />
        <MessageBar />
      </div>
    );
  }
});
