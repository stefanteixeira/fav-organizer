require('./support/system');
var assert = require('assert');
var nconf = require('nconf');
nconf.file('settings.json');

describe('Visual Regression Tests', function() {

  it('should load the page', function() {
    assert.ok(this.application.hasPageContent());
  });

  it('signin page screenshot', function(done) {
    this.application.capture(this.test.fullTitle()).then(function() {
      done();
    })
  });

  it('should perform a login', function() {
    this.application.login(nconf.get('login'), nconf.get('pass'));
  });

  it('home page screenshot', function(done) {
    var homePage = this.application.getHomePage();
    homePage.capture(this.test.fullTitle()).then(function() {
      done();
    });
  });

});
