import React from 'react';

import { m } from '../utils';
import messageStore from '../stores/messages';
import DateSeparator from './DateSeparator';
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
    let messages = [];

    this.state.messages.forEach(msg => {

      if (msg.date.getDate() !== lastDate) {
        lastDate = msg.date.getDate();
        messages.push(<DateSeparator date={msg.date} />);
      }

      if (msg.type === 'peerConnected') {
        messages.push(
          <Message key={msg.uuid} date={msg.date}>
            <span style={{fontWeight: 'bold'}}>{msg.nick}</span>
            <span> connected</span>
          </Message>
        );
      }

      else if (msg.type === 'peerDisconnected') {
        messages.push(
          <Message key={msg.uuid} date={msg.date}>
            <span style={{fontWeight: 'bold'}}>{msg.nick}</span>
            <span> disconnected</span>
          </Message>
        );
      }

      else if (msg.type === 'message') {
        messages.push(
          <Message key={msg.uuid} date={msg.date}>
            <span style={{fontWeight: 'bold'}}>{msg.nick}</span>
            <span>: </span>
            <span>{msg.body}</span>
          </Message>
        );
      }

      else if (msg.type === 'nickChange') {
        messages.push(
          <Message key={msg.uuid} date={msg.date}>
            <span style={{fontWeight: 'bold'}}>{msg.oldNick}</span>
            <span> changed their nick to </span>
            <span style={{fontWeight: 'bold'}}>{msg.newNick}</span>
          </Message>
        );
      }

      else if (msg.type === 'nickTaken') {
        messages.push(
          <Message key={msg.uuid} date={msg.date}>
            <span>The nick </span>
            <span style={{fontWeight: 'bold'}}>{msg.nick}</span>
            <span> is already in use!</span>
          </Message>
        );
      }
    });

    return (
      <div style={m(this.props.style, {overflowY: 'auto'})}>{messages}</div>
    );
  }
});
