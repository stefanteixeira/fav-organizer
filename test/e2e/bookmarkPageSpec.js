var BookmarkPage = new require('./pages/bookmarkPage');

describe('Bookmark page', function() {
  var page = new BookmarkPage();

  beforeEach(function() {
    page.open();
  });

  it('should create a bookmark', function() {
    var title = 'Bookmark ' + new Date().getTime();
    var url = 'http://' + new Date().getTime() + '.com';
    page.saveBookmark(title, url);
    expect(page.getMessage()).toContain('success');
  });
});
