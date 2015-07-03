import React from 'react';
import classNames from 'classnames';

import actions from '../actions';

export default React.createClass({
  getInitialState: function() {
    return {message: ''};
  },

  onChange: function() {
    this.setState({message: this.refs.input.getDOMNode().value});
  },

  onKeyUp: function(evt) {
    if (evt.which == 13 && this.state.message !== '') {
      actions.sendMessage(this.state.message);
      this.setState({message: ''});
    }
  },

  render: function() {
    let classes = classNames(
      'MessageInput',
      this.props.className
    );

    return (
      <input
        type="text"
        ref="input"
        value={this.state.message}
        onChange={this.onChange}
        onKeyUp={this.onKeyUp}
        className={classes}
        style={this.props.style}
      />
    );
  }
});
