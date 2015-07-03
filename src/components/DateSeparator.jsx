import React from 'react';
import classNames from 'classnames';
import { formatDate } from '../utils';

export default React.createClass({
  propTypes: {
    date: React.PropTypes.instanceOf(Date).isRequired
  },

  render: function() {
    let classes = classNames(
      'DateSeparator',
      this.props.className
    );

    return (
      <div className={classes}>
        <span className="date">{formatDate(this.props.date)}</span>
        <div className="rule"/>
      </div>
    );
  }
});
