function verifyAuth(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    res.status('401').json('Unauthorized');
  }
}

module.exports = function(app) {
  var controller = app.controllers.bookmark;

  app.route('/bookmarks')
     .get(controller.listBookmarks)
     .post(verifyAuth, controller.saveBookmark);

  app.route('/bookmarks/:id')
     .get(verifyAuth, controller.getBookmark)
     .delete(verifyAuth, controller.deleteBookmark);
};
