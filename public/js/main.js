angular.module('fav-organizer', ['ngRoute', 'ngResource'])
  .config(function($routeProvider, $httpProvider) {

    $httpProvider.interceptors.push('authInterceptor');

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

    $routeProvider.when('/auth', {
      templateUrl: 'partials/auth.html'
    });

    $routeProvider.otherwise({redirectTo: '/bookmarks'});
});
