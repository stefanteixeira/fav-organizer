describe('BookmarkController', function() {
  var $scope, $httpBackend;

  beforeEach(function() {
    module('fav-organizer');
    inject(function($injector, _$httpBackend_) {
      $scope = $injector.get('$rootScope').$new();
      $httpBackend = _$httpBackend_;
      $httpBackend.when('GET', '/bookmarks/1')
                  .respond({_id: '1'});
      $httpBackend.when('GET', '/bookmarks')
                  .respond([{}]);
    });
  });

  it('should create an empty bookmark when no route parameters are passed', function() {
    inject(function($controller) {
      $controller('BookmarkController', {'$scope': $scope});

      expect($scope.bookmark._id).toBeUndefined();
    });
  });

  it('should return a bookmark when a route parameter is passed', function() {
    inject(function($controller) {
      $controller('BookmarkController', {
        '$routeParams': {bookmarkId: 1},
        '$scope': $scope
      });
      $httpBackend.flush();

      expect($scope.bookmark._id).toBeDefined();
    });
  });

});
