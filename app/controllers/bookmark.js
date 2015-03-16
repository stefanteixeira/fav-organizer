module.exports = function(app) {

  var Bookmark = app.models.bookmark;

  var controller = {};

  controller.listBookmarks = function(req, res) {
    Bookmark.find().exec()
      .then(
        function(bookmarks) {
          res.json(bookmarks);
        },
        function(err) {
          console.log(err);
          res.status(500).json(err);
        }
      );
  };

  controller.getBookmark = function(req, res) {
    var bookmarkId = req.params.id;
    Bookmark.findById(bookmarkId).exec()
      .then(
        function(bookmark) {
          if(!bookmark) throw new Error('Bookmark not found');
          res.json(bookmark);
        },
        function(err) {
          console.log(err);
          res.status(400).json(err);
        }
      );
  };

  controller.deleteBookmark = function(req, res) {
    var bookmarkId = req.params.id;
    Bookmark.remove({"_id": bookmarkId}).exec()
      .then(
        function() {
          res.end();
        },
        function(err) {
          return console.error(err);
        }
      );
  };

  controller.saveBookmark = function(req, res) {
    var bookmarkId = req.body._id;
    if(bookmarkId) {
      Bookmark.findByIdAndUpdate(bookmarkId, req.body).exec()
        .then(
          function(bookmark) {
            res.json(bookmark);
          },
          function(err) {
            console.error(err);
            res.status(500).json(err);
          }
        );
    } else {
      Bookmark.create(req.body)
        .then(
          function(bookmark) {
            res.status(201).json(bookmark);
          },
          function(err) {
            console.log(err);
            res.status(500).json(err);
          }
        );
    }
  };

  function add(newBookmark) {

  }

  function update(bookmarkToUpdate) {

  }

  return controller;
};
