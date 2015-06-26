import React from 'react';
import App from './components/App';

React.render(<App />, document.getElementById('root'));

import messageStore from './stores/messages';

let newMessages = 0;
let isActive = true;
let original = document.title;

messageStore.listen(function(messages) {
  if (messages[messages.length-1].type === 'message') {
    newMessages += 1;
  }

  if (!isActive && newMessages > 0) {
    document.title = '(' + newMessages + ') ' + original;
  }
});

window.addEventListener('focus', function() {
  newMessages = 0;
  isActive = true;
  document.title = original;
});

window.addEventListener('blur', function() {
  isActive = false;
});
