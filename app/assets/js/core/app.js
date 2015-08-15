'use strict';

var app, deps;

deps = [
	// 'ngRoute',

	//3rd module
	'ui.bootstrap',
	'ui.router', //use new ui-roter framework
	'ngResource',
	'ngAnimate',
	'ngMap',
	'avaughan.logging',
	'blockUI',

	// 'eehNavigation',

	//i18n support
	'pascalprecht.translate',//註解掉會爆


	//commom modules
	'myApp.filters',
	'myApp.services',
	'myApp.helper',
	'myApp.directives',
	'myApp.controllers'
];

//myApp模組可使用的相關相依模組
app = angular.module('myApp', deps);

app.run(['$rootScope', '$log', '$state', '$stateParams', 'AuthService', 'AUTH_EVENTS', 'USER_ROLES',
	function($rootScope, $log, $state, $stateParams, AuthService, AUTH_EVENTS, USER_ROLES) {

		//inoder to active nav item
		// <li ng-class="{active: $state.includes('list')}">
		// <a ui-sref-active="active" ui-sref="list">Shopping</a></li>

		$rootScope.$state = $state;
		$rootScope.$stateParams = $stateParams;

		//monitor state change
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
			$log.log('status change start');
			$log.log(toState);

			var authorizedRoles = toState.data.authorizedRoles;
			$log.log('current authorizedRoles:' + authorizedRoles);

			var isAuthorized = AuthService.isAuthorized(authorizedRoles);
			$log.log('isAuthorized:' + isAuthorized);

			if (!isAuthorized) {

				// When a user is not authorized to access the page
				//(because he’s not logged in or doesn’t have the right role),
				//the transition to the next page will be prevented,
				//so the user will stay on the current page.
				event.preventDefault();

				if (AuthService.isAuthenticated()) {
					$log.log('user is not allowed');
					$rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
				} else {
					$log.log('user is not logged in');
					$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
				}

			}
		});

	}
]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'USER_ROLES',
	function( $stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, USER_ROLES) {

		$httpProvider.interceptors.push([
			'$injector',
			function($injector) {
				return $injector.get('AuthInterceptor');
			}
		]);

		// Anonymous routes
		$stateProvider
			.state('anon', {
				abstract: true,
				template: '<ui-view/>',
				data: {
					authorizedRoles: [USER_ROLES.guest]
				}
			})
			.state('anon.login', {
				url: '/login',
				templateUrl: 'partials/login.html',
				controller: 'LoginCtrl',
				data: {
			        pageTitle: 'login'
			    }
			})

		// Public routes

		// Use $stateProvider to configure your states.
		$stateProvider
			.state('public', {
				abstract: true,
				template: '<ui-view/>',
				data: {
					authorizedRoles: [USER_ROLES.all]
				}
			})
			.state('public.404', {
				url: '/404',
				templateUrl: 'partials/404.html',
				data: {
			        pageTitle: '404'
			      }
			})

		//Multiple Named Views
		.state('public.home', {
			url: '/home',

			views: {

				// the main template will be placed here (relatively named)
				// replace unnamed view '<div ui-view></div>'  in this state's parent state, 'home'.
				'': {
					templateUrl: 'partials/global.index.html'
				},

				//viewname@statusname

				// the child views will be defined here (absolutely named)

				'header@public.home': {
					templateUrl: 'partials/global.header.html',
					controller: 'HeaderCtrl'
				},

				'main_body@public.home': {

					templateUrl: 'partials/home/home.body.html',
					controller: 'HomeCtrl'
				},

				// for column two, we'll define a separate controller
				'footer@public.home': {
					templateUrl: 'partials/global.footer.html'
				}

			},

			data: {
		        pageTitle: 'Home'
		     }
		})

		//conf page does not include header/footer views
		.state('public.conf', {
			url: '/conf',
			templateUrl: 'partials/conf.html',
			controller: 'ConfCtrl',
			data: {
		        pageTitle: 'Config '
		     }
		});


		// if no url matchs, it will redirect to 404 page
		$urlRouterProvider.otherwise('/404');


		// it will cause infinie loop
		// $locationProvider.html5Mode(true);

		$httpProvider.interceptors.push(function($q, $location) {
			return {
				'responseError': function(response) {

					// if(response.status === 401 || response.status === 403) {
					//     $location.path('/login');
					// }
					return $q.reject(response);
				}
			};
		});

	}
]);



