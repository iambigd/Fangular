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

		// Anonymous routes
    	$stateProvider
	        .state('anon', {
	            abstract: true,
	            template: '<ui-view/>'
	        })
	        .state('anon.login', {
	            url: '/login',
	            templateUrl: 'partials/login.html',
	            controller: 'LoginCtrl'
	        })

		// Public routes

		// Use $stateProvider to configure your states.
		$stateProvider
			 .state('public', {
	            abstract: true,
	            template: '<ui-view/>',
	            data: {

	            }
	        })
	        .state('public.404', {
	            url: '/404',
	            templateUrl: 'partials/404.html'
	        })

	        //Multiple Named Views
			.state('public.home', {
				url: '/home',

				views:{

					// the main template will be placed here (relatively named)
					// replace unnamed view '<div ui-view></div>'  in this state's parent state, 'home'.
		            '' : {
		            	templateUrl: 'partials/home/home.html'
		        	},

		            //viewname@statusname

		            // the child views will be defined here (absolutely named)

		            'header@public.home': {
		            	templateUrl: 'partials/global.header.html'

		            },

		            'main_body@public.home': {

		            	templateUrl: 'partials/home/home.body.html',
		            	controller: 'HomeCtrl'
		           	},

		            // for column two, we'll define a separate controller
		            'footer@public.home': {
		                templateUrl: 'partials/global.footer.html'
		            }

				}
			})


			.state('public.shopping', {
				url: '/shopping',

				views:{

					// the main template will be placed here (relatively named)
					// replace unnamed view '<div ui-view></div>'  in this state's parent state, 'home'.
		            '' : {
		            	templateUrl: 'partials/shopping/shopping.html'
		        	},

		            //viewname@statusname

		            // the child views will be defined here (absolutely named)

		            'header@public.shopping': {
		            	templateUrl: 'partials/global.header.html'

		            },

		            'main_body@public.shopping': {

		            	templateUrl: 'partials/shopping/shopping.body.html',
		            	controller: 'ShoppingCtrl'
		           	},

		            // for column two, we'll define a separate controller
		            'footer@public.shopping': {
		                templateUrl: 'partials/global.footer.html'
		            }

				}
			})


			//nested view from parent status 'public.shopping'
			.state('public.shopping.item', {
				url: '/:item',
				templateUrl: 'partials/shopping/shopping.item.html',

				controller: function($scope, $stateParams) {
					$scope.item = $stateParams.item;
				}
			})

			//conf page does not include header/footer views
			.state('public.conf', {
				url: '/conf',
				templateUrl: 'partials/conf.html',
				controller: 'ConfCtrl'
			});


		// if no url matchs, it will redirect to 404 page
		$urlRouterProvider.otherwise('/404');


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