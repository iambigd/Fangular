'use strict';

var app, deps;

deps = [
	// 'ngRoute',
	'ui.router', //use new ui-roter framework
	'ngResource',
	'ngAnimate',
	'myApp.filters',
	'myApp.helper',
	'myApp.services',
	'myApp.directives',
	'myApp.controllers'
];

app = angular.module('myApp', deps);

// app.run(['$rootScope','$log', '$state', 'Auth', function ($rootScope,$log, $state, Auth) {
app.run(['$rootScope','$log', '$state', '$stateParams', function ($rootScope, $log, $state, $stateParams) {

	//inoder to active nav item
	// <li ng-class="{active: $state.includes('list')}">
	// <a ui-sref-active="active" ui-sref="list">Shopping</a></li>

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
    	$log.log("status change");

    	//you can add Auth service to check authorization

        // if (!Auth.authorize(toState.data.access)) {

        //     $rootScope.error = "Seems like you tried accessing a route you don't have access to...";
        //     event.preventDefault();

        //     if(fromState.url === '^') {
        //         if(Auth.isLoggedIn()) {
        //             $state.go('user.home');
        //         } else {
        //             $rootScope.error = null;
        //             $state.go('anon.login');
        //         }
        //     }
        // }
    });

}]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

		// Use $stateProvider to configure your states.
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'partials/home.html',
				controller: 'HomeCtrl'
			})
			.state('list', {
				url: '/list',
				templateUrl: 'partials/list.html',
				controller: 'ListCtrl'
			})
			.state('list.item', {
				url: '/:item',
				templateUrl: 'partials/list.item.html',
				controller: function($scope, $stateParams) {
					$scope.item = $stateParams.item;
				}
			})
			.state('404', {
				url: '/404',
				templateUrl: 'partials/404.html',
				controller: function($scope, $stateParams) {
					// console.log("load 404 controller");
					$scope.item = $stateParams.item;
				}
			})
			.state('conf', {
				url: '/conf',
				templateUrl: 'partials/conf.html',
				controller: 'ConfCtrl'
			});


		$urlRouterProvider.otherwise('/404');
		// $urlRouterProvider.otherwise('/home');



	    // it will cause infinie loop
	    // $locationProvider.html5Mode(true);

	    $httpProvider.interceptors.push(function($q, $location) {
	        return {
	            'responseError': function(response) {
	            	$log.log('responseError');
	                // if(response.status === 401 || response.status === 403) {
	                //     $location.path('/login');
	                // }
	                return $q.reject(response);
	            }
	        };
	    });

	}
]);





/**
 * Configuration
 *
 * @author Festum
 */
app.factory('config', function($location) {
	var project = $location.absUrl().split('/')[3],
		project = project.search("#") > 0 ? project : '';
	return JSON.parse(angular.toJson({
		site: {
			protocal: $location.protocol(),
			server: $location.host(),
			project: project,
			port: $location.port(),
			endpoint: $location.protocol() + '://' + $location.host() + ($location.port() == '80' || $location.port() == '443' ? '' : $location.port()) + (project == '' ? '' : '/' + project) + '/#',
			draggable: true,
			sort: 'nmst',
			orders: '1010',
		}
	}));
});

app.factory('configFile', function($resource) {
	return $resource('config.json', {}, {
		getData: {
			method: 'GET',
			isArray: false
		}
	});
});