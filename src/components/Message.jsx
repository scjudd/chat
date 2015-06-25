import React from 'react';

import { formatTime } from '../utils';

export default React.createClass({
  propTypes: {
    date: React.PropTypes.instanceOf(Date).isRequired
  },

  render: function() {
    return (
      <div style={{wordWrap: 'break-word'}}>
        <span>{formatTime(this.props.date)} │ </span>
        {this.props.children}
      </div>
    );
  }
});
