import React, { Component } from 'react';

import { m } from '../utils';

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
    var styles = {
      message: {
        margin: 0,
        padding: 0
      },
      part: {
        display: 'inline'
      },
      date: {
        paddingRight: '0.5em',
        marginRight: '0.5em',
        borderRight: '1px solid black'
      },
      nick: {
        fontWeight: 'bold',
        marginRight: '1em'
      }
    };

    return (
      <ul style={styles.message}>
        <li style={m(styles.part, styles.date)}>
          {formatTime(new Date(this.props.date))}
        </li>
        <li style={m(styles.part, styles.nick)}>
          {this.props.nick}:
        </li>
        <li style={styles.part}>{this.props.body}</li>
      </ul>
    );
  }
}
