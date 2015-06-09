import React, { Component } from 'react';

import MessageList from './MessageList';
import MessageBar from './MessageBar';

export default class App extends Component {
  render() {
    return (
      <div>
        <MessageList />
        <MessageBar />
      </div>
    );
  }
}
