angular.module('myApp.controllers').config(function ($translateProvider) {


	$translateProvider
	.useSanitizeValueStrategy('escaped')
	.translations('zh_TW', {

		HOME: '首頁',
		LANG_EN_US: 'English',
		LANG_ZH_TW: '繁體中文',


	});
});