import React, { Component } from 'react';
import { AppDispatcher } from '../dispatcher';
import { nickStore } from '../stores/nick';

export default class MessageBar extends Component {
  constructor() {
    super();

    this.state = {
      nick: undefined,
      message: ""
    };

    this.nickSet = this.nickSet.bind(this);
    this.updateNick = this.updateNick.bind(this);
    this.submitNickChange = this.submitNickChange.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
    this.render = this.render.bind(this);
  }

  updateNick() {
    this.setState({nick: this.refs.nick.getDOMNode().value});
  }

  submitNickChange() {
    AppDispatcher.dispatch({
      eventName: 'change-nick',
      nick: this.state.nick
    });
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

  componentDidMount() {
    nickStore.bind('change', this.nickSet);
  }

  componentWillUnmount() {
    nickStore.unbind('change', this.nickSet);
  }

  nickSet() {
    var nick = nickStore.get();
    console.log('changing nick to: ' + nick);
    this.setState({nick: nick});
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
      },
      nickInput: {
        boxSizing: 'border-box',
        padding: 6,
        border: '1px solid black',
        fontSize: '1.25em'
      }
    };

    return (
      <div style={styles.container}>
        <input
          type="text"
          ref="nick"
          value={this.state.nick}
          onChange={this.updateNick}
          onBlur={this.submitNickChange}
          placeholder="Nick"
          style={styles.nickInput} />
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
