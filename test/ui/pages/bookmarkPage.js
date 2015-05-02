var bookmarkPage = function() {
  this.open = function() {
    browser.get('http://54.149.253.66:3000/#/bookmark');
  };

  this.saveBookmark = function(title, url) {
    element(by.model('bookmark.title')).sendKeys(title);
    element(by.model('bookmark.url')).sendKeys(url);
    element(by.id('btn-save')).click();
  };

  this.getMessage = function() {
    return element(by.binding('message.text')).getText();
  };
};
module.exports = bookmarkPage;
