angular.module('myApp.controllers').config(function ($translateProvider) {


	$translateProvider
	.useSanitizeValueStrategy('escaped')
	.translations('en_US', {


		HOME: 'HOME',
		LANG_EN_US: 'English',
		LANG_ZH_TW: '繁體中文',

	});
});