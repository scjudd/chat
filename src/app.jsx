import React, { Component } from 'react';

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
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        <DateSeparator key="sep-1" date={new Date("01/01/2015")} />,
        <Message key="msg-1" date={new Date("01/01/2015 12:36:00")} nick="n0c" body="test message 1" />,
        <DateSeparator key="sep-2" date={new Date("01/02/2015")} />,
        <Message key="msg-2" date={new Date("01/02/2015 12:37:00")} nick="Shadow_Wanderer" body="test message 2" />,
        <Message key="msg-3" date={new Date("01/02/2015 12:38:00")} nick="n0c" body="test message 3" />
      ]
    };
  }

  render() {
    return (
      <div className="messages">
        {this.state.messages}
      </div>
    );
  }
}

class MessageBar extends Component {
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
  render() {
    return (
      <div>
        <Messages />
        <MessageBar />
      </div>
    );
  }
}
