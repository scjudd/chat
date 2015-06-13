import React from 'react';
import { formatDate } from '../utils';

export default React.createClass({
  render: function() {
    let styles = {
      container: {
        textAlign: 'center',
      },
      date: {
        background: 'white',
        padding: '0 0.5rem'
      },
      horizontalRule: {
        position: 'relative',
        bottom: '0.5rem',
        borderBottom: '1px dotted black',
        zIndex: -1
      }
    };

    return (
      <div style={{textAlign: 'center'}}>
        <span style={styles.date}>{formatDate(this.props.date)}</span>
        <div style={styles.horizontalRule} />
      </div>
    );
  }
});
