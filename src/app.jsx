import React, { Component } from 'react';
import { Dispatcher } from 'flux';
import MicroEvent from 'microevent';
import io from 'socket.io-client';

function uuid() {
  var i, random;
  var uuid = '';
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }

    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}

var MessageStore = function() {
  this.items = [];
}
MessageStore.prototype.getAll = function() {
  return this.items;
}
MicroEvent.mixin(MessageStore);

var messageStore = new MessageStore();

var AppDispatcher = new Dispatcher();

AppDispatcher.register(function(payload) {
  switch(payload.eventName) {
    case 'new-message':
      messageStore.items.push(payload.message);
      messageStore.trigger('change');
      break;
  }
  return true;
});


function zeroPad(num) {
  return num < 10 ? '0' + num : num;
}

function formatTime(date) {
  return (
    zeroPad(date.getHours()) + ':' +
    zeroPad(date.getMinutes()) + ':' +
    zeroPad(date.getSeconds())
  );
}

function formatDate(date) {
  var months = [
    "January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];
  return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}

class Message extends Component {
  render() {
    return (
      <ul className="message">
        <li>{formatTime(this.props.date)}</li>
        <li>{this.props.nick}</li>
        <li>{this.props.body}</li>
      </ul>
    );
  }
}

class DateSeparator extends Component {
  render() {
    return (
      <div style={{textAlign: 'center'}} className="dateSeparator">
        <span style={{ background: 'white', padding: '0 0.5rem' }}>
          {formatDate(this.props.date)}
        </span>
        <div
          style={{
            position: 'relative',
            bottom: '0.5rem',
            borderBottom: '1px dotted black',
            zIndex: -1,
          }}
        />
      </div>
    );
  }
}

class Messages extends Component {
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
      <div className="messages">
        {messages}
      </div>
    );
  }
}

class MessageBar extends Component {
  update(e) {
    if (e.which == 13) {
      AppDispatcher.dispatch({
        eventName: 'new-message',
        message: {
          nick: 'n0c',
          date: new Date(),
          body: e.target.value
        }
      });
      e.target.value = "";
    }
  }

  render() {
    return (
      <div
        style={{
          boxSizing: 'border-box',
          position: 'fixed',
          bottom: 0,
          width: '100%',
          padding: 6,
        }}>
        <input
          type="text"
          onKeyUp={this.update}
          className="messageBar"
          placeholder="Type your message here"
          style={{
            boxSizing: 'border-box',
            width: 'inherit',
            padding: 6,
            border: '1px solid black',
            fontSize: '1.25em',
          }}
        />
      </div>
    );
  }
}

export default class App extends Component {
  componentWillMount() {
    this.socket = io();
    this.socket.on('connect', function() {
      console.log('connected!');
    });
  }

  render() {
    return (
      <div>
        <Messages />
        <MessageBar />
      </div>
    );
  }
}
