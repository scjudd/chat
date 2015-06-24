module.exports = function (internal) {

  internal = internal || [];

  var cmpFn = function(a, b) {
    if (a[0] < b[0])
      return -1;
    if (a[0] > b[0])
      return 1;
    return 0;
  };

  return {
    set: function(key, value) {
      internal.push([key, value]);
      internal.sort(cmpFn);
    },

    indexOf: function(key) {
      var i;
      for (i = 0; i < internal.length; i++) {
        if (internal[i][0] === key) {
          return i;
        }
      }
      return -1;
    },

    get: function(key) {
      var index = this.indexOf(key);
      if (index !== -1) {
        return internal[index][1];
      }
    },

    delete: function(key) {
      var index = this.indexOf(key);
      if (index !== -1) {
        internal.splice(index, 1);
      }
    },

    array: function() {
      return internal;
    }
  };
};
