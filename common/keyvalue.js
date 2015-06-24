var KVFns = {
  indexOf: function(key) {
    for (var i = 0; i < this.length; i++) {
      if (this[i][0] === key) return i;
    }
    return -1;
  },

  push: function(key, value) {
    this.push([key, value]);
    this.sort(function(a, b) {
      if (a[0] < b[0]) return -1;
      if (a[0] > b[0]) return 1;
      return 0;
    });
  },

  get: function(key) {
    var index = KVFns.indexOf.call(this, key);
    if (index > -1) return this[index][1];
  },

  delete: function(key) {
    var index = KVFns.indexOf.call(this, key);
    if (index > -1) this.splice(index, 1);
  }
};

module.exports = KVFns;
