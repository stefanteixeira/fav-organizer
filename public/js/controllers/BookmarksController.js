angular.module('fav-organizer').controller('BookmarksController', function($scope, Bookmark) {
  $scope.bookmarks = [];

  $scope.bookmarkFilter = '';

  $scope.message = {text: ''};

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
