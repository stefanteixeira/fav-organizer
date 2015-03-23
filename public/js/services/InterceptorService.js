angular.module('fav-organizer').factory('authInterceptor', function($location, $q) {

  var interceptor = {
    responseError: function(res) {
      if(res.status == 401) {
        $location.path('auth');
      }
      return $q.reject(res);
    }
  }

  return interceptor;
});
