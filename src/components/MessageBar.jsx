import React from 'react';
import classNames from 'classnames';

export default React.createClass({
  render: function() {
    let classes = classNames(
      'MessageBar',
      this.props.className
    );

    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
});
