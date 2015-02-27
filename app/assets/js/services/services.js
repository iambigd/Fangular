"use strict";

angular.module('myApp.services', [])

.value('version', '0.0.1')

/***
 *      /$$$$$$  /$$$$$$$  /$$$$$$       /$$$$$$$$ /$$    /$$ /$$$$$$$$ /$$   /$$ /$$$$$$$$
 *     /$$__  $$| $$__  $$|_  $$_/      | $$_____/| $$   | $$| $$_____/| $$$ | $$|__  $$__/
 *    | $$  \ $$| $$  \ $$  | $$        | $$      | $$   | $$| $$      | $$$$| $$   | $$
 *    | $$$$$$$$| $$$$$$$/  | $$        | $$$$$   |  $$ / $$/| $$$$$   | $$ $$ $$   | $$
 *    | $$__  $$| $$____/   | $$        | $$__/    \  $$ $$/ | $$__/   | $$  $$$$   | $$
 *    | $$  | $$| $$        | $$        | $$        \  $$$/  | $$      | $$\  $$$   | $$
 *    | $$  | $$| $$       /$$$$$$      | $$$$$$$$   \  $/   | $$$$$$$$| $$ \  $$   | $$
 *    |__/  |__/|__/      |______/      |________/    \_/    |________/|__/  \__/   |__/
 *
 *
 *
 */
.constant('AUTH_EVENTS', {
	loginSuccess: 'auth-login-success',
	loginFailed: 'auth-login-failed',
	logoutSuccess: 'auth-logout-success',
	sessionTimeout: 'auth-session-timeout',
	notAuthenticated: 'auth-not-authenticated',
	notAuthorized: 'auth-not-authorized'
})

/***
 *     /$$$$$$$   /$$$$$$  /$$       /$$$$$$$$
 *    | $$__  $$ /$$__  $$| $$      | $$_____/
 *    | $$  \ $$| $$  \ $$| $$      | $$
 *    | $$$$$$$/| $$  | $$| $$      | $$$$$
 *    | $$__  $$| $$  | $$| $$      | $$__/
 *    | $$  \ $$| $$  | $$| $$      | $$
 *    | $$  | $$|  $$$$$$/| $$$$$$$$| $$$$$$$$
 *    |__/  |__/ \______/ |________/|________/
 *
 *
 *
 */
.constant('USER_ROLES', {
	all: '*',
	admin: 'admin',
	editor: 'editor',
	guest: 'guest'
})

/***
 *      /$$$$$$  /$$   /$$ /$$$$$$$$ /$$   /$$
 *     /$$__  $$| $$  | $$|__  $$__/| $$  | $$
 *    | $$  \ $$| $$  | $$   | $$   | $$  | $$
 *    | $$$$$$$$| $$  | $$   | $$   | $$$$$$$$
 *    | $$__  $$| $$  | $$   | $$   | $$__  $$
 *    | $$  | $$| $$  | $$   | $$   | $$  | $$
 *    | $$  | $$|  $$$$$$/   | $$   | $$  | $$
 *    |__/  |__/ \______/    |__/   |__/  |__/
 *
 *
 *
 */
.factory('AuthService', ['$http', '$log', 'Session', 'USER_ROLES','ServerConfig',
	function($http, $log, Session, USER_ROLES, ServerConfig) {

	return {

		login: function(credentials,success,error) {

			//build api endpoint
			// var apiEndpoint = ServerConfig.endpoint + 'auth/login', credentials;
			// $log.log('call login api:' + apiEndpoint);
			// $log.log(credentials);

			// return $http
			// 	.post(apiEndpoint)
			// 	.success(function(res) {
			// 		$log.log('resposne');
			// 		$log.log(res);
			// 		Session.create(res.id, res.userid, res.role);
			// 	}).error(error);


		},

		logout: function(){

		},

		isAuthenticated: function() {
			return !!Session.userId;
		},

		isAuthorized: function(authorizedRoles) {
			$log.log('isAuthorized role:' + authorizedRoles);
			$log.log('Session.userRole:' + Session.userRole);

			if (!angular.isArray(authorizedRoles)) {
				authorizedRoles = [authorizedRoles];
			}

			if(USER_ROLES.all == authorizedRoles){
				$log.log('access public page');
				return true;
			}else if(USER_ROLES.guest == authorizedRoles){
				return true;
			}else{
				return (this.isAuthenticated() &&
					authorizedRoles.indexOf(Session.userRole) !== -1);
			}

		}
	};

}])


/***
 *     /$$$$$$ /$$   /$$ /$$$$$$$$ /$$$$$$$$ /$$$$$$$   /$$$$$$  /$$$$$$$$ /$$$$$$$  /$$$$$$$$ /$$$$$$  /$$$$$$$
 *    |_  $$_/| $$$ | $$|__  $$__/| $$_____/| $$__  $$ /$$__  $$| $$_____/| $$__  $$|__  $$__//$$__  $$| $$__  $$
 *      | $$  | $$$$| $$   | $$   | $$      | $$  \ $$| $$  \__/| $$      | $$  \ $$   | $$  | $$  \ $$| $$  \ $$
 *      | $$  | $$ $$ $$   | $$   | $$$$$   | $$$$$$$/| $$      | $$$$$   | $$$$$$$/   | $$  | $$  | $$| $$$$$$$/
 *      | $$  | $$  $$$$   | $$   | $$__/   | $$__  $$| $$      | $$__/   | $$____/    | $$  | $$  | $$| $$__  $$
 *      | $$  | $$\  $$$   | $$   | $$      | $$  \ $$| $$    $$| $$      | $$         | $$  | $$  | $$| $$  \ $$
 *     /$$$$$$| $$ \  $$   | $$   | $$$$$$$$| $$  | $$|  $$$$$$/| $$$$$$$$| $$         | $$  |  $$$$$$/| $$  | $$
 *    |______/|__/  \__/   |__/   |________/|__/  |__/ \______/ |________/|__/         |__/   \______/ |__/  |__/
 *
 *
 *
 *
 *
 *
 */
/*
 * Simple auth interceptor
 * It can be ehanced with this great github repo
 * 'https://github.com/witoldsz/angular-http-auth/blob/master/src/http-auth-interceptor.js'
 *
 */

.factory('AuthInterceptor', function($rootScope, $q, AUTH_EVENTS) {

	/*
	401 Unauthorized — The user is not logged in
	403 Forbidden — The user is logged in but isn’t allowed access
	419 Authentication Timeout (non standard) — Session has expired
	440 Login Timeout (Microsoft only) — Session has expired
	*/
	return {
		responseError: function(response) {
			if (response.status === 401) {
				$rootScope.$broadcast(AUTH_EVENTS.notAuthenticated,
					response);
			}
			if (response.status === 403) {
				$rootScope.$broadcast(AUTH_EVENTS.notAuthorized,
					response);
			}
			if (response.status === 419 || response.status === 440) {
				$rootScope.$broadcast(AUTH_EVENTS.sessionTimeout,
					response);
			}
			return $q.reject(response);
		}
	};
})

/***
 *      /$$$$$$  /$$$$$$$$  /$$$$$$   /$$$$$$  /$$$$$$  /$$$$$$  /$$   /$$
 *     /$$__  $$| $$_____/ /$$__  $$ /$$__  $$|_  $$_/ /$$__  $$| $$$ | $$
 *    | $$  \__/| $$      | $$  \__/| $$  \__/  | $$  | $$  \ $$| $$$$| $$
 *    |  $$$$$$ | $$$$$   |  $$$$$$ |  $$$$$$   | $$  | $$  | $$| $$ $$ $$
 *     \____  $$| $$__/    \____  $$ \____  $$  | $$  | $$  | $$| $$  $$$$
 *     /$$  \ $$| $$       /$$  \ $$ /$$  \ $$  | $$  | $$  | $$| $$\  $$$
 *    |  $$$$$$/| $$$$$$$$|  $$$$$$/|  $$$$$$/ /$$$$$$|  $$$$$$/| $$ \  $$
 *     \______/ |________/ \______/  \______/ |______/ \______/ |__/  \__/
 *
 *
 *
 */
//session store
.service('Session', function() {

	var sessionObj = this;

	var sessionId = null;
	var userId = null;
	var userRole = null;

	sessionObj.create = function(sessionId, userId, userRole) {
		sessionId = sessionId;
		userId = userId;
		userRole = userRole;
	};
	sessionObj.destroy = function() {
		sessionId = null;
		userId = null;
		userRole = null;
	};
	sessionObj.getSession = function(){
		return {
			sessionId : sessionId,
			userid: userId,
			userRole: userRole
		}
	};

	return sessionObj;
})

/***
 *      /$$$$$$   /$$$$$$  /$$   /$$ /$$$$$$$$ /$$$$$$  /$$$$$$
 *     /$$__  $$ /$$__  $$| $$$ | $$| $$_____/|_  $$_/ /$$__  $$
 *    | $$  \__/| $$  \ $$| $$$$| $$| $$        | $$  | $$  \__/
 *    | $$      | $$  | $$| $$ $$ $$| $$$$$     | $$  | $$ /$$$$
 *    | $$      | $$  | $$| $$  $$$$| $$__/     | $$  | $$|_  $$
 *    | $$    $$| $$  | $$| $$\  $$$| $$        | $$  | $$  \ $$
 *    |  $$$$$$/|  $$$$$$/| $$ \  $$| $$       /$$$$$$|  $$$$$$/
 *     \______/  \______/ |__/  \__/|__/      |______/ \______/
 *
 *
 *
 */

.service('ServerConfig', function($location) {
	// var project = $location.absUrl().split('/')[3],
	// 	project = project.search("#") > 0 ? project : '';
	// return JSON.parse(angular.toJson({
	// 	site: {
	// 		protocal: $location.protocol(),
	// 		server: $location.host(),
	// 		project: project,
	// 		port: $location.port(),
	// 		endpoint: $location.protocol()
	// 			+ '://' + $location.host()
	// 			+ ($location.port() == '80' || $location.port() == '443' ? '' : $location.port())
	// 			+ (project == '' ? '' : '/' + project) + '/#',
	// 		draggable: true,
	// 		sort: 'nmst',
	// 		orders: '1010',
	// 	}
	// }));

	var serverConfig = this;
	serverConfig.endpoint = "http://localhost/";
	return serverConfig;
})

.factory('ServerConfigFile', function($resource) {
	return $resource('config.json', {}, {
		getData: {
			method: 'GET',
			isArray: false
		}
	});
});

