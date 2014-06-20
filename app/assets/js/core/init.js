head.load(
	'libs/bootstrap/dist/css/bootstrap.min.css',
	'libs/bootstrap/dist/css/bootstrap-theme.min.css',
	'assets/css/app.css',
	'assets/css/demo.css',
	'libs/angular/angular.min.js',
	'libs/angular-loader/angular-loader.min.js',
	'libs/angular-route/angular-route.min.js',
	'libs/angular-resource/angular-resource.min.js',
	'libs/angular-translate/angular-translate.min.js',
	'libs/angular-animate/angular-animate.min.js',
	'libs/angular-bootstrap/ui-bootstrap-tpls.min.js',
	'libs/angular-ui-utils/ui-utils.min.js',
	'libs/angular-ui-router/release/angular-ui-router.min.js',
	'assets/js/core/struct.js',
	'assets/js/i18n/en_US.js',
	'assets/js/i18n/zh_TW.js',
	'assets/js/services/helper.js',
	'assets/js/filters/interpolate.js',
	'assets/js/directives/directives.js',
	'assets/js/controllers/controllers.js',
	function() {
		head.load(
			'assets/js/core/app.js'
		);
		head.ready(function () {
			//angular app start
			angular.bootstrap(document, ['myApp']);
		});
	}
);


