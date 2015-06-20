import React from 'react';

import NickInput from './NickInput';
import MessageInput from './MessageInput';

export default React.createClass({
  render: function() {
    let style = {
      boxSizing: 'border-box',
      position: 'fixed',
      bottom: 0,
      width: '100%',
      padding: 6
    };

    return (
      <div style={style}>
        <NickInput />
        <MessageInput />
      </div>
    );
  }
});
