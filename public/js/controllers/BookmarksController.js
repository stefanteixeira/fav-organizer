angular.module('fav-organizer').controller('BookmarksController', function($scope, $resource) {
  $scope.bookmarks = [];

  $scope.bookmarkFilter = '';

  $scope.message = {text: ''};

  //Gets the specific bookmark in server-side
  //Remember that this route only exists in server-side!
  var Bookmark = $resource('/bookmarks/:id');

  function findBookmarks() {
    Bookmark.query(
      function(bookmarks) {
        $scope.bookmarks = bookmarks;
        $scope.message = {};
      },
      function(err) {
        $scope.message = {
          text: 'Could not retrieve bookmarks'
        };
        console.log(err);
      });
  }
  findBookmarks();

  $scope.remove = function(bookmark) {
    Bookmark.delete({id: bookmark._id},
      findBookmarks,
      function(err) {
        $scope.message = {
          text: 'Could not remove bookmark'
        };
        console.log(err);
      });
  };
});
