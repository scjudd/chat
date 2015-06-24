import React from 'react';

import actions from '../actions';
import userStore from '../stores/users';

export default React.createClass({
  getInitialState: function() {
    return {users: []};
  },

  componentWillMount: function() {
    actions.getPeerList();
  },
  
  componentDidMount: function() {
    this.unsubscribe = userStore.listen(this.onChange);
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  onChange: function(users) {
    this.setState({users});
    if (this.props.onChange !== undefined) {
      this.props.onChange();
    }
  },

  render: function() {
    let style = {
      position: 'fixed',
      right: 0,
      top: 0,
      margin: 0,
      height: '100%',
      padding: '0.5rem 1rem',
      listStyle: 'none',
      borderLeft: '1px solid black'
    };

    let users = [];
    this.state.users.forEach(function(pair) {
      users.push(<li key={pair[1]}>{pair[0]}</li>);
    });

    return <ul style={style}>{users}</ul>;
  }
});
