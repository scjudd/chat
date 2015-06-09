import React, { Component } from 'react';
import { AppDispatcher } from '../dispatcher';

export default class MessageBar extends Component {
  update(e) {
    if (e.which == 13 && e.target.value !== "") {
      AppDispatcher.dispatch({
        eventName: 'message-sent',
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
