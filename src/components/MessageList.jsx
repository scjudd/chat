import React from 'react';

import messageStore from '../stores/messages';
import Message from './Message';

export default React.createClass({
  getInitialState: function() {
    return {messages: []};
  },

  componentDidMount: function() {
    this.unsubscribe = messageStore.listen(this.onMessageReceived);
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  onMessageReceived: function(messages) {
    this.setState({messages});
  },

  render: function() {
    let lastDate;
    let messages = this.state.messages.map(msg => {
      if (msg.type === 'peerConnected') {
        return (
          <Message key={uuid()} date={msg.date}>
            <span style={{fontWeight: 'bold'}}>{msg.nick}</span>
            <span> connected</span>
          </Message>
        );
      } else if (msg.type === 'peerDisconnected') {
        return (
          <Message key={uuid()} date={msg.date}>
            <span style={{fontWeight: 'bold'}}>{msg.nick}</span>
            <span> disconnected</span>
          </Message>
        );
      } else if (msg.type === 'message') {
        return (
          <Message key={uuid()} date={msg.date}>
            <span style={{fontWeight: 'bold'}}>{msg.nick}</span>
            <span>: </span>
            <span>{msg.body}</span>
          </Message>
        );
      } else if (msg.type === 'nickChange') {
        return (
          <Message key={uuid()} date={msg.date}>
            <span style={{fontWeight: 'bold'}}>{msg.oldNick}</span>
            <span> changed their nick to </span>
            <span style={{fontWeight: 'bold'}}>{msg.newNick}</span>
          </Message>
        );
      } else if (msg.type === 'nickTaken') {
        return (
          <Message key={uuid()} date={msg.date}>
            <span>The nick </span>
            <span style={{fontWeight: 'bold'}}>{msg.nick}</span>
            <span> is already in use!</span>
          </Message>
        );
      }
    });

    return (
      <div>{messages}</div>
    );
  }
});
