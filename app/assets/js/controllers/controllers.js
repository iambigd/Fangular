
/***
 *     /$$   /$$ /$$$$$$$$  /$$$$$$  /$$$$$$$  /$$$$$$$$ /$$$$$$$
 *    | $$  | $$| $$_____/ /$$__  $$| $$__  $$| $$_____/| $$__  $$
 *    | $$  | $$| $$      | $$  \ $$| $$  \ $$| $$      | $$  \ $$
 *    | $$$$$$$$| $$$$$   | $$$$$$$$| $$  | $$| $$$$$   | $$$$$$$/
 *    | $$__  $$| $$__/   | $$__  $$| $$  | $$| $$__/   | $$__  $$
 *    | $$  | $$| $$      | $$  | $$| $$  | $$| $$      | $$  \ $$
 *    | $$  | $$| $$$$$$$$| $$  | $$| $$$$$$$/| $$$$$$$$| $$  | $$
 *    |__/  |__/|________/|__/  |__/|_______/ |________/|__/  |__/
 *
 *
 */
angular.module('myApp.controllers').controller('HeaderCtrl', ['$rootScope' ,'$scope', 'avLog', 'AuthService', 'Session', '$location',
  function($rootScope, $scope, avLog, AuthService, Session, $location) {

    var logger = avLog.getLogger('HeaderCtrl');

    logger.info('load header page');

    $scope.openSideMenu = function(){
      logger.debug('open side menu');

    }
    // $scope.currUser = Session.getSessionUser();
    // $log.log($scope.currUser);

    // $scope.logout = function() {
    //   logger.debug('press logout button');
    //   AuthService.logout(
    //     function(data, status, headers, config) {
    //       $location.path('/login');

    //     }, function(data, status, headers, config) {
    //       logger.error('fail to logout');
    //     });
    // };

  }
]);

angular.module('myApp.controllers').controller('ConfCtrl', function($scope, $log) {

});