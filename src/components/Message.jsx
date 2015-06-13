import React from 'react';

import { formatTime } from '../utils';

export default React.createClass({
  render: function() {
    return (
      <div>
        <span>{formatTime(this.props.date)} │ </span>
        {this.props.children}
      </div>
    );
  }
});
