import React, { Component } from 'react';

import { formatTime } from '../utils';

export default class Message extends Component {
  render() {
    return (
      <div>
        <span>{formatTime(this.props.date)} │ </span>
        {this.props.children}
      </div>
    );
  }
}
