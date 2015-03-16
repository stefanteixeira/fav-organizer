var mongoose = require('mongoose');

module.exports = function() {
  var schema = mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    }
  });

  return mongoose.model('Bookmark', schema);
};
