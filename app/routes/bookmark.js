module.exports = function(app) {
  var controller = app.controllers.bookmark;

  app.route('/bookmarks')
     .get(controller.listBookmarks)
     .post(controller.saveBookmark);

  app.route('/bookmarks/:id')
     .get(controller.getBookmark)
     .delete(controller.deleteBookmark);
};
