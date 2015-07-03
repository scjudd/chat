import React from 'react';
import classNames from 'classnames';

import actions from '../actions';
import nickStore from '../stores/nick';

export default React.createClass({
  getInitialState: function() {
    return {last: undefined, nick: undefined};
  },

  componentDidMount: function() {
    this.unsubscribe = nickStore.listen(this.onChangeReceived);
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  onChangeReceived: function(info) {
    this.setState({last: info.nick, nick: info.nick});
  },

  onChange: function() {
    this.setState({nick: this.refs.input.getDOMNode().value});
  },

  onBlur: function() {
    if (this.state.last !== this.state.nick) {
      actions.changeNick(this.state.nick);
    }
  },

  render: function() {
    let classes = classNames(
      'NickInput',
      this.props.className
    );

    return (
      <input
        type="text"
        ref="input"
        value={this.state.nick}
        onChange={this.onChange}
        onBlur={this.onBlur}
        className={classes}
      />
    );
  }
});
