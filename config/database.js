var mongoose = require('mongoose');

module.exports = function(uri) {
  mongoose.connect(uri);

  mongoose.set('debug', true);

  mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + uri);
  });

  mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected from ' + uri);
  });

  mongoose.connection.on('error', function() {
    console.log('Error in Mongoose connection from ' + uri);
  });

  process.on('SIGINT', function() {
    mongoose.connection.close(function() {
      console.log('Mongoose disconnected by application termination');
      process.exit(0);
    });
  });
}
