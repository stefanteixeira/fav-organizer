var bookmarks = [
  {_id: 1, title: 'Blog Stefan', url: 'http://stefanteixeira.com.br'},
  {_id: 2, title: 'Google', url: 'https://www.google.com.br'},
  {_id: 3, title: 'GitHub', url: 'https://github.com'},
  {_id: 4, title: 'Twitter', url: 'https://twitter.com'}
];

var ID_BOOKMARK_INC = 4;

module.exports = function() {
  var controller = {};
  controller.listBookmarks = function(req, res) {
    res.json(bookmarks);
  };

  controller.getBookmark = function(req, res) {
    var bookmarkId = req.params.id;

    var bookmark = bookmarks.filter(function(bookmark) {
      return bookmark._id == bookmarkId;
    })[0];

    bookmark ? res.json(bookmark) : res.status(404).send('Bookmark not found');
  };

  controller.deleteBookmark = function(req, res) {
    var bookmarkId = req.params.id;
    bookmarks = bookmarks.filter(function(bookmark) {
      return bookmark._id != bookmarkId;
    });
    res.status(204).send();
  };

  controller.saveBookmark = function(req, res) {
    var bookmark = req.body;
    bookmark = bookmark._id ? update(bookmark) : add(bookmark);
    res.json(bookmark);
  };

  function add(newBookmark) {
    newBookmark._id = ++ID_BOOKMARK_INC;
    bookmarks.push(newBookmark);

    return newBookmark;
  }

  function update(bookmarkToUpdate) {
    bookmarks = bookmarks.map(function(bookmark) {
      if(bookmark._id == bookmarkToUpdate._id) {
        bookmark = bookmarkToUpdate;
      }
      return bookmark;
    });

    return bookmarkToUpdate;
  }

  return controller;
};
