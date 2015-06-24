import React from 'react';

export default React.createClass({
  render: function() {
    let style = {
      boxSizing: 'border-box',
      position: 'fixed',
      bottom: 0,
      width: '100%',
      padding: 6
    };

    return (
      <div style={style}>
        {this.props.children}
      </div>
    );
  }
});
