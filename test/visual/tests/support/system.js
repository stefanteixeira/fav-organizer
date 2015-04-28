var underscore = require('underscore');
var helper = require('../../lib/helper');

// This file connects the helpers with the testing-system.
// In this case it is Mocha, but it can be used with anything
// that can handle asynchronous test execution for setup/teardown.

var helperReferences;

// Once at the beginning, trigger "setup" from the helpers,
// and save the returned helper properties for later use (see below).
before(function (done) {
  helper.setup().then(function (ref) {
    helperReferences = ref;
    done();
  }, function (err) {
    done(err);
  });
});

// Copy all helpers directly to the test-scope - the helpers
// will then be available to all tests using "test.<helperFn>(..)".
//
// With Mocha, we could have set these values directly in "before" above,
// but we only could do that because Mocha supports this. However, not
// a many testing frameworks can do that. To keep this example simple
// for porting into other testing frameworks, I will use it in this way.
beforeEach(function () {
  underscore.keys(helperReferences).forEach(function (key) {
    this[key] = helperReferences[key];
  }, this);
});

// After all tests ran, trigger the tearDown code in the helper.
after(function (done) {
  helper.tearDown().then(function () {
    done();
  }, function (err) {
    done(err);
  });
});
