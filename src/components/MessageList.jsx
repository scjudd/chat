import React from 'react';

import { uuid } from '../utils';
import MessageStore from '../stores/messages';
import Message from './Message';

export default React.createClass({
  getInitialState: function() {
    return {
      messages: []
    };
  },

  componentDidMount: function() {
    MessageStore.bind('change', this.changed);
  },

  componentWillUnmount: function() {
    MessageStore.unbind('change', this.changed);
  },

  changed: function() {
    let messages = MessageStore.getAll();
    this.setState({messages});
  },

  render: function() {
    let lastDate;
    let messages = this.state.messages.map(msg => {
      if (msg.type === 'message') {
        return (
          <Message key={uuid()} date={msg.date}>
            <span style={{fontWeight: 'bold'}}>{msg.nick}</span>
            <span>: </span>
            <span>{msg.body}</span>
          </Message>
        );
      } else if (msg.type === 'nick-changed') {
        return (
          <Message key={uuid()} date={msg.date}>
            <span style={{fontWeight: 'bold'}}>{msg.oldNick}</span>
            <span> changed their nick to </span>
            <span style={{fontWeight: 'bold'}}>{msg.newNick}</span>
          </Message>
        );
      } else if (msg.type === 'nick-taken') {
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
