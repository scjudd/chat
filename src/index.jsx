import React from 'react';
import App from './components/App';

React.render(<App />, document.getElementById('root'));

import messageStore from './stores/messages';

let lastMsgCount;
let isActive = true;
let original = document.title;

messageStore.listen(function(messages) {
  lastMsgCount = lastMsgCount || messages.length - 1;

  if (!isActive) {
    document.title = '(' + (messages.length - lastMsgCount) + ') ' + original;
  }
});

window.addEventListener('focus', function() {
  lastMsgCount = undefined;
  isActive = true;
  document.title = original;
});

window.addEventListener('blur', function() {
  isActive = false;
});
