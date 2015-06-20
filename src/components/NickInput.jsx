import React from 'react';

import Dispatcher from '../dispatcher';
import NickStore from '../stores/nick';

export default React.createClass({
  getInitialState: function() {
    return {nick: undefined};
  },

  componentDidMount: function() {
    NickStore.bind('change', this.onChangeReceived);
  },

  componentWillUnmount: function() {
    NickStore.unbind('change', this.onChangeReceived);
  },

  onChangeReceived: function() {
    this.setState({nick: NickStore.get()});
  },

  onChange: function() {
    this.setState({nick: this.refs.input.getDOMNode().value});
  },

  onBlur: function() {
    Dispatcher.dispatch({
      eventName: 'change-nick',
      nick: this.state.nick
    });
  },

  render: function() {
    let style = {
      boxSizing: 'border-box',
      padding: 6,
      border: '1px solid black',
      fontSize: '1.25em'
    };

    return (
      <input
        type="text"
        ref="input"
        value={this.state.nick}
        onChange={this.onChange}
        onBlur={this.onBlur}
        style={style}
      />
    );
  }
});
