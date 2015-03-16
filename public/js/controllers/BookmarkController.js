angular.module('fav-organizer').controller('BookmarkController',
 function($scope, $routeParams, Bookmark) {

   if($routeParams.bookmarkId) {
     Bookmark.get({id: $routeParams.bookmarkId},
            function(bookmark) {
              $scope.bookmark = bookmark;
            },
            function(err) {
              $scope.message = {
                text: 'Could not retrieve bookmark. New bookmark.'
              };
              console.log(err);
            }
      );
   } else {
     $scope.bookmark = new Bookmark();
   }

   $scope.save = function() {
     $scope.bookmark.$save()
        .then(function() {
          $scope.message = {
            text: 'Bookmark saved successfully'
          },
          $scope.bookmark = new Bookmark();
        })
        .catch(function(err) {
          $scope.message = {
            text: 'Could not save bookmark'
          }
        });
   };

});
