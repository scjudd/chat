import React, { Component } from 'react';

import { uuid } from '../utils';
import { messageStore } from '../stores/messages';
import Message from './Message';

export default class MessageList extends Component {
  constructor() {
    super();
    this.state = {messages: []};
    this.changed = this.changed.bind(this);
    this.render = this.render.bind(this);
  }

  componentDidMount()    { messageStore.bind(  'change', this.changed); }
  componentWillUnmount() { messageStore.unbind('change', this.changed); }
  changed()              { this.setState({messages: messageStore.getAll()}); }

  render() {
    var lastDate;
    var messages = this.state.messages.map(function(msg) {
      return <Message key={uuid()} date={msg.date} nick={msg.nick} body={msg.body} />
    });
    return (
      <div className="messageList">
        {messages}
      </div>
    );
  }
}
