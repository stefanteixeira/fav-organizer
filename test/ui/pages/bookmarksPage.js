var bookmarksPage = function() {
  this.open = function() {
    browser.get('http://54.149.253.66:3000/#/bookmarks');
  };

  this.getLoggedUser = function() {
    return element(by.id('logged-user')).getText();
  };
};
module.exports = bookmarksPage;
