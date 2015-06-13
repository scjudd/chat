import React from 'react';

import Dispatcher from '../dispatcher';
import NickStore from '../stores/nick';

export default React.createClass({
  getInitialState: function() {
    return {
      nick: undefined,
      message: ""
    };
  },

  updateNick: function() {
    let nick = this.refs.nick.getDOMNode().value;
    this.setState({nick});
  },

  submitNickChange: function() {
    Dispatcher.dispatch({
      eventName: 'change-nick',
      nick: this.state.nick
    });
  },

  updateMessage: function() {
    let message = this.refs.message.getDOMNode().value;
    this.setState({message});
  },

  submitMessage: function(e) {
    if (e.which == 13 && e.target.value !== "") {
      Dispatcher.dispatch({
        eventName: 'message-sent',
        message: this.state.message
      });
      this.setState({message: ""});
    }
  },

  componentDidMount: function() {
    NickStore.bind('change', this.nickSet);
  },

  componentWillUnmount: function() {
    NickStore.unbind('change', this.nickSet);
  },

  nickSet: function() {
    let nick = NickStore.get();
    console.log('changing nick to: ' + nick);
    this.setState({nick});
  },

  render: function() {
    let styles = {
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
});
