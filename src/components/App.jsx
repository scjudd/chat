import React from 'react';

import UserList from './UserList';
import MessageList from './MessageList';
import MessageBar from './MessageBar';
import NickInput from './NickInput';
import MessageInput from './MessageInput';

export default React.createClass({
  getInitialState: function() {
    return {
      msgListWidth: undefined,
      msgListHeight: undefined,
      msgInputWidth: undefined,
      msgInputLeft: undefined
    };
  },

  onResize: function() {
    let userList = this.refs.userList.getDOMNode();
    let msgBar = this.refs.msgBar.getDOMNode();
    let nickInput = this.refs.nickInput.getDOMNode();
    let msgInput = this.refs.msgInput.getDOMNode();

    let msgListWidth = window.innerWidth - userList.offsetWidth;
    let msgListHeight = window.innerHeight - msgBar.offsetHeight;
    let msgInputWidth = msgListWidth - nickInput.offsetWidth - nickInput.offsetLeft * 3;
    let msgInputLeft = nickInput.offsetLeft;

    this.setState({
      msgListWidth,
      msgListHeight,
      msgInputWidth,
      msgInputLeft,
    });
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.onResize);
  },

  render: function() {
    return (
      <div>
        <UserList ref="userList" onChange={this.onResize} />

        <MessageList style={{
          width: this.state.msgListWidth,
          height: this.state.msgListHeight
        }} />

        <MessageBar ref="msgBar">

          <NickInput ref="nickInput" />

          <MessageInput ref="msgInput" style={{
            width: this.state.msgInputWidth,
            marginLeft: this.state.msgInputLeft
          }} />

        </MessageBar>
      </div>
    );
  }
});
