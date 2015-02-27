"use strict";

angular.module('myApp.services')

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
