import assign from 'object-assign';

export function m(...args) {
  let res = {};
  for (let i = 0; i < args.length; ++i) {
    if (args[i]) {
      assign(res, args[i]);
    }
  }
  return res;
}

export function uuid() {
  let i, random;
  let uuid = '';
  for (i = 0; i < 32; i++) {
    random = Math.random() * 16 | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += '-';
    }

    uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
  }
  return uuid;
}

function zeroPad(num) {
  return num < 10 ? '0' + num : num;
}

export function formatTime(date) {
  return (
    zeroPad(date.getHours()) + ':' +
    zeroPad(date.getMinutes()) + ':' +
    zeroPad(date.getSeconds())
  );
}

export function formatDate(date) {
  let months = [
    "January", "February", "March", "April", "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];
  return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}
