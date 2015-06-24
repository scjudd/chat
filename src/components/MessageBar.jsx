import React from 'react';

import NickInput from './NickInput';
import MessageInput from './MessageInput';

export default React.createClass({
  componentDidMount: function() {
    this.updateHeight();
    window.addEventListener('resize', this.updateHeight);
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.updateHeight);
  },

  updateHeight: function() {
    if (this.props.heightCallback !== undefined) {
      this.props.heightCallback(this.getDOMNode().offsetHeight);
    }
  },

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
