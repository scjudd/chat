import React from 'react';

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
    let style = {
      boxSizing: 'border-box',
      width: 'inherit',
      padding: 6,
      border: '1px solid black',
      fontSize: '1.25em'
    };

    return (
      <input
        type="text"
        ref="input"
        value={this.state.message}
        onChange={this.onChange}
        onKeyUp={this.onKeyUp}
        style={style} />
    );
  }
});
