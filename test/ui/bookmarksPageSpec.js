var BookmarksPage = new require('./pages/bookmarksPage');

describe('Home page', function() {
  var page = new BookmarksPage();

  beforeEach(function() {
    page.open();
  });

  it('should be logged in', function() {
    page.getLoggedUser()
        .then(function(text) {
          expect(text.trim().length).toBeGreaterThan(0);
        });
  });
});
