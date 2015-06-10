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

export default class Message extends Component {
  render() {
    return (
      <ul className="message">
        <li>{formatTime(new Date(this.props.date))}</li>
        <li>{this.props.nick}</li>
        <li>{this.props.body}</li>
      </ul>
    );
  }
}
