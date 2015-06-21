import React from 'react';

import { uuid } from '../utils';
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
  },

  render: function() {
    let style = {
      float: 'right'
    };

    return (
      <ul style={style}>
        {this.state.users.map(function(user) {
          return <li key={uuid()}>{user}</li>
        })}
      </ul>
    );
  }
});
