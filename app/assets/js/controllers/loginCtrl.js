angular.module('myApp.controllers').controller('LoginCtrl', ['$scope', '$log', 'AuthService', '$location',
  function($scope, $log, AuthService, $location) {
  $log.log('load login page');

  $scope.login = function(credentials){
      $log.log('user login');
      $log.log(credentials);

      // credentials = {};
      // credentials.account = 'oyster';
      // credentials.pwd = '123456789';

      AuthService.login(credentials);
      $location.path("home");
  }

}]);
