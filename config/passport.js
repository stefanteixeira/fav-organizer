var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var nconf = require('nconf');
var mongoose = require('mongoose');

nconf.file('settings.json');

module.exports = function() {

  var User = mongoose.model('User');

  passport.use(new GitHubStrategy({
    clientID: nconf.get('clientID'),
    clientSecret: nconf.get('clientSecret'),
    callbackURL: nconf.get('callbackURL')
  }, function(accessToken, refreshToken, profile, done) {

    User.findOrCreate(
      {
        "login": profile.username
      },
      {
        "name": profile.username
      },
      function(err, user) {
        if(err) {
          console.log(err);
          return done(err);
        }
        return done(null, user);
      }
    );
  }));

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id).exec()
      .then(function(user) {
        done(null, user);
      });
  });
};
