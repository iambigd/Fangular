head.load(


	//3rd css
    'libs/bootstrap/dist/css/bootstrap.min.css',
    'libs/bootstrap/dist/css/bootstrap-theme.min.css',

    'assets/css/font-awesome.min.css',
	'assets/css/animation.min.css', //animation css style
	'assets/css/eeh-navigation.css',
    'assets/css/app.css', //app


	// 'libs/angular/angular.min.js',//angular core
	'libs/angular/angular.js',

	'libs/angular-loader/angular-loader.min.js',
	'libs/angular-route/angular-route.min.js',
	'libs/angular-translate/angular-translate.min.js',
	'libs/angular-resource/angular-resource.min.js',
	'libs/angular-translate/angular-translate.min.js',
	'libs/angular-animate/angular-animate.min.js',
	'libs/angular-bootstrap/ui-bootstrap-tpls.min.js',
	'libs/angular-ui-utils/ui-utils.min.js',
	'libs/angular-ui-router/release/angular-ui-router.min.js',

	//like log4j
	'libs/angular-logging/src/angular-logging.js',
	//eeh-navigation
	'libs/eeh-navigation/dist/eeh-navigation.js',
	'libs/eeh-navigation/dist/eeh-navigation.tpl.js',

	'assets/js/core/struct.js',

	//i18n
	'assets/js/i18n/en_US.js',
	'assets/js/i18n/zh_TW.js',

	//common services,filters,directives,controllers
	'assets/js/services/services.js',
	'assets/js/services/helper.js',//Optional by festurm
	'assets/js/filters/filters.js',
	'assets/js/directives/directives.js',
	'assets/js/controllers/controllers.js',


	'assets/js/services/authServices.js',//authentication


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


