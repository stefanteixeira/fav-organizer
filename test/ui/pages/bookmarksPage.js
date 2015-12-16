var bookmarksPage = function() {
  this.open = function() {
    browser.get('http://52.32.97.145:3000/#/bookmarks');
  };

  this.getLoggedUser = function() {
    return element(by.id('logged-user')).getText();
  };
};
module.exports = bookmarksPage;
