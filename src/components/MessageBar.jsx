import React, { Component } from 'react';
import { AppDispatcher } from '../dispatcher';

export default class MessageBar extends Component {
  constructor() {
    super();

    this.state = {
      message: ""
    };

    this.updateMessage = this.updateMessage.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.render = this.render.bind(this);
  }

  updateMessage() {
    this.setState({message: this.refs.message.getDOMNode().value});
  }

  submitMessage(e) {
    if (e.which == 13 && e.target.value !== "") {
      AppDispatcher.dispatch({
        eventName: 'message-sent',
        message: this.state.message
      });
      this.setState({message: ""});
    }
  }

  render() {
    var styles = {
      container: {
        boxSizing: 'border-box',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        padding: 6
      },
      input: {
        boxSizing: 'border-box',
        width: 'inherit',
        padding: 6,
        border: '1px solid black',
        fontSize: '1.25em'
      }
    };

    return (
      <div style={styles.container}>
        <input
          type="text"
          ref="message"
          value={this.state.message}
          onChange={this.updateMessage}
          onKeyUp={this.submitMessage}
          placeholder="Type your message here"
          style={styles.input} />
      </div>
    );
  }
}
