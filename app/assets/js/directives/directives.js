angular.module('myApp.directives')

.directive('appVersion', ['version', function(version) {
	return function(scope, elm, attrs) {
		elm.text(version);
	};
}])

.directive('updatePageTitle',['$rootScope', function($rootScope) {
  return {
    link: function(scope, element) {

      var listener = function(event, toState, toParams, fromState, fromParams) {
        var title = 'Default Title';
        console.log(toState.data.pageTitle);
        if (toState.data && toState.data.pageTitle){

        	title = toState.data.pageTitle;
        }
        element.text(title)
      };

      $rootScope.$on('$stateChangeStart', listener);
    }
}}]);