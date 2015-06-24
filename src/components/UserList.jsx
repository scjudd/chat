import React from 'react';

import actions from '../actions';
import userStore from '../stores/users';

export default React.createClass({
  getInitialState: function() {
    return {users: new Map()};
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
  },

  render: function() {
    let style = {
      float: 'right'
    };

    let users = [];
    this.state.users.forEach(function(uuid, nick) {
      users.push(<li key={uuid}>{nick}</li>);
    });

    return <ul style={style}>{users}</ul>;
  }
});
