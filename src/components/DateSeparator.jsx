import React, { Component } from 'react';

function formatDate(date) {
  var months = [
    "January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];
  return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}

export default class DateSeparator extends Component {
  render() {
    return (
      <div style={{textAlign: 'center'}} className="dateSeparator">
        <span style={{ background: 'white', padding: '0 0.5rem' }}>
          {formatDate(this.props.date)}
        </span>
        <div
          style={{
            position: 'relative',
            bottom: '0.5rem',
            borderBottom: '1px dotted black',
            zIndex: -1,
          }}
        />
      </div>
    );
  }
}
