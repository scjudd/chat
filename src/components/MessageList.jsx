import React from 'react';
import classNames from 'classnames';

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

    let classes = classNames(
      'MessageList',
      this.props.className
    );

    this.state.messages.forEach(msg => {

      if (msg.date.getDate() !== lastDate) {
        lastDate = msg.date.getDate();
        messages.push(<DateSeparator key={'date-'+msg.uuid} date={msg.date} />);
      }

      if (msg.type === 'peerConnected') {
        messages.push(
          <Message className="peerConnected" key={msg.uuid} date={msg.date}>
            <span className="nick">{msg.nick}</span>
            <span> connected</span>
          </Message>
        );
      }

      else if (msg.type === 'peerDisconnected') {
        messages.push(
          <Message className="peerDisconnected" key={msg.uuid} date={msg.date}>
            <span className="nick">{msg.nick}</span>
            <span> disconnected</span>
          </Message>
        );
      }

      else if (msg.type === 'message') {
        messages.push(
          <Message className="message" key={msg.uuid} date={msg.date}>
            <span className="nick">{msg.nick}</span>
            <span>: </span>
            <span className="body">{msg.body}</span>
          </Message>
        );
      }

      else if (msg.type === 'nickChange') {
        messages.push(
          <Message className="nickChange" key={msg.uuid} date={msg.date}>
            <span className="old nick">{msg.oldNick}</span>
            <span> changed their nick to </span>
            <span className="new nick">{msg.newNick}</span>
          </Message>
        );
      }

      else if (msg.type === 'nickTaken') {
        messages.push(
          <Message className="nickTaken" key={msg.uuid} date={msg.date}>
            <span>The nick </span>
            <span className="nick">{msg.nick}</span>
            <span> is already in use!</span>
          </Message>
        );
      }
    });

    return (
      <div className={classes} style={this.props.style}>
        {messages}
      </div>
    );
  }
});
