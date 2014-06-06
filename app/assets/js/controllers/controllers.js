angular.module('myApp.controllers').controller('HomeCtrl', function($scope, $log) {
  $log.log('load home page');

  $scope.hello = "Hello Angular..";

});

angular.module('myApp.controllers').controller('ListCtrl', function($scope, $log, $http) {
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

angular.module('myApp.controllers').controller('ConfCtrl', function($scope, $log, configFile) {
  configFile.get(function(data) {
    $log.log(data);
    $scope.config = data;
  });
});