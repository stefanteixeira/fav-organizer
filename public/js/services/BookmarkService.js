angular.module('fav-organizer').factory('Bookmark', function($resource) {
  return $resource('/bookmarks/:id');
});
