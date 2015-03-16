var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

module.exports = function() {

  passport.use(new GitHubStrategy({
    
  }));
};
