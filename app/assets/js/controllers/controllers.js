/***
 *     /$$        /$$$$$$   /$$$$$$  /$$$$$$ /$$   /$$
 *    | $$       /$$__  $$ /$$__  $$|_  $$_/| $$$ | $$
 *    | $$      | $$  \ $$| $$  \__/  | $$  | $$$$| $$
 *    | $$      | $$  | $$| $$ /$$$$  | $$  | $$ $$ $$
 *    | $$      | $$  | $$| $$|_  $$  | $$  | $$  $$$$
 *    | $$      | $$  | $$| $$  \ $$  | $$  | $$\  $$$
 *    | $$$$$$$$|  $$$$$$/|  $$$$$$/ /$$$$$$| $$ \  $$
 *    |________/ \______/  \______/ |______/|__/  \__/
 *
 *
 *
 */
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

/***
 *     /$$   /$$  /$$$$$$  /$$      /$$ /$$$$$$$$
 *    | $$  | $$ /$$__  $$| $$$    /$$$| $$_____/
 *    | $$  | $$| $$  \ $$| $$$$  /$$$$| $$
 *    | $$$$$$$$| $$  | $$| $$ $$/$$ $$| $$$$$
 *    | $$__  $$| $$  | $$| $$  $$$| $$| $$__/
 *    | $$  | $$| $$  | $$| $$\  $ | $$| $$
 *    | $$  | $$|  $$$$$$/| $$ \/  | $$| $$$$$$$$
 *    |__/  |__/ \______/ |__/     |__/|________/
 *
 *
 *
 */
angular.module('myApp.controllers').controller('HomeCtrl', function($scope, avLog,$translate) {

  var logger = avLog.getLogger('HomeCtrl');

  // alert($translate.use());
  logger.debug('current lang: ' + $translate.use());
  // $translate.use('zh_TW')
  logger.debug('load home page');

  $scope.getCurrentLang = function(){

    //從$translate觸發的會無法觸發其他ui-view的language
      // alert('current lang: ' + $translate.use());

      // $translate.use($translate.use());

  };

  $scope.set_zhTW = function(){
     $translate.use('zh_TW');
  };

  $scope.set_enUS = function(){
    $translate.use('en_US');
  };





});

/***
 *      /$$$$$$  /$$   /$$  /$$$$$$  /$$$$$$$  /$$$$$$$  /$$$$$$ /$$   /$$  /$$$$$$
 *     /$$__  $$| $$  | $$ /$$__  $$| $$__  $$| $$__  $$|_  $$_/| $$$ | $$ /$$__  $$
 *    | $$  \__/| $$  | $$| $$  \ $$| $$  \ $$| $$  \ $$  | $$  | $$$$| $$| $$  \__/
 *    |  $$$$$$ | $$$$$$$$| $$  | $$| $$$$$$$/| $$$$$$$/  | $$  | $$ $$ $$| $$ /$$$$
 *     \____  $$| $$__  $$| $$  | $$| $$____/ | $$____/   | $$  | $$  $$$$| $$|_  $$
 *     /$$  \ $$| $$  | $$| $$  | $$| $$      | $$        | $$  | $$\  $$$| $$  \ $$
 *    |  $$$$$$/| $$  | $$|  $$$$$$/| $$      | $$       /$$$$$$| $$ \  $$|  $$$$$$/
 *     \______/ |__/  |__/ \______/ |__/      |__/      |______/|__/  \__/ \______/
 *
 *
 *
 */
angular.module('myApp.controllers').controller('ShoppingCtrl', function($scope, $log, $http) {
  $log.log('load list page');

  $scope.shoppingList = [{
    name: 'Milk'
  }, {
    name: 'Eggs'
  }, {
    name: 'Bread'
  }, {
    name: 'Cheese'
  }, {
    name: 'Ham'
  }];

  $scope.selectItem = function(selectedItem) {
    $log.log(selectedItem);


    var indexOfShopping = 0;
    var lenOfShopping = $scope.shoppingList.length;
    for (indexOfShopping; indexOfShopping < lenOfShopping; indexOfShopping++) {
      var item = $scope.shoppingList[indexOfShopping];
      $log.log(item);
      item.selected = false; //reset active item
      if (selectedItem === item) {
        selectedItem.selected = true;
      }
    }

  };

});

/***
 *      /$$$$$$   /$$$$$$  /$$   /$$ /$$$$$$$$
 *     /$$__  $$ /$$__  $$| $$$ | $$| $$_____/
 *    | $$  \__/| $$  \ $$| $$$$| $$| $$
 *    | $$      | $$  | $$| $$ $$ $$| $$$$$
 *    | $$      | $$  | $$| $$  $$$$| $$__/
 *    | $$    $$| $$  | $$| $$\  $$$| $$
 *    |  $$$$$$/|  $$$$$$/| $$ \  $$| $$
 *     \______/  \______/ |__/  \__/|__/
 *
 *
 *
 */
angular.module('myApp.controllers').controller('ConfCtrl', function($scope, $log) {

});