import React from 'react';
import classNames from 'classnames';

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
    let classes = classNames(
      'UserList',
      this.props.className
    );

    let users = [];
    this.state.users.forEach(function(pair) {
      users.push(<li key={pair[1]}>{pair[0]}</li>);
    });

    return (
      <ul className={classes}>
        {users}
      </ul>
    );
  }
});
