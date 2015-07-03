import React from 'react';
import classNames from 'classnames';

import { formatTime } from '../utils';

export default React.createClass({
  propTypes: {
    date: React.PropTypes.instanceOf(Date).isRequired
  },

  render: function() {
    let classes = classNames(
      'Message',
      this.props.className
    );

    return (
      <div className={classes}>
        <span className="date">{formatTime(this.props.date)}</span>
        <span className="separator"> │ </span>
        <span className="payload">
          {this.props.children}
        </span>
      </div>
    );
  }
});
