angular.module('fav-organizer', ['ngRoute', 'ngResource']).config(function($routeProvider) {
  $routeProvider.when('/bookmarks', {
    templateUrl: 'partials/bookmarks.html',
    controller: 'BookmarksController'
  });

  $routeProvider.when('/bookmark/:bookmarkId', {
    templateUrl: 'partials/bookmark.html',
    controller: 'BookmarkController'
  });

  $routeProvider.when('/bookmark', {
    templateUrl: 'partials/bookmark.html',
    controller: 'BookmarkController'
  });

  $routeProvider.otherwise({redirectTo: '/bookmarks'});
});
