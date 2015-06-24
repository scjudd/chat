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
