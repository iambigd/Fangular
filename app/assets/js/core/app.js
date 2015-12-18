'use strict';

var app, deps;

deps = [
    // 'ngRoute',



    'pascalprecht.translate', ////i18n support,註解掉會爆
    'ui.bootstrap',
    'ui.router', //use new ui-roter framework
    'ngResource',
    'ngAnimate',

    'avaughan.logging',

    //3rd module'
    'eehNavigation',

    //commom modules
    'myApp.filters',
    'myApp.services',
    'myApp.helper',
    'myApp.directives',
    'myApp.controllers'
];

//myApp模組可使用的相關相依模組
app = angular.module('myApp', deps);

app.run(['$rootScope', 'avLog', '$state', '$stateParams', 'AuthService', 'AUTH_EVENTS', 'USER_ROLES',
    function($rootScope, avLog, $state, $stateParams, AuthService, AUTH_EVENTS, USER_ROLES) {

        var logger = avLog.getLogger('app.js');

        //inoder to active nav item
        // <li ng-class="{active: $state.includes('list')}">
        // <a ui-sref-active="active" ui-sref="list">Shopping</a></li>

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;


        //monitor state change
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            logger.debug('status change start');
            logger.debug(toState);

            logger.info('status change start: from ' + fromState.name + " to " + toState.name);
            // logger.debug(toState);

            //目前頁面支援的權限
            var authorizedRoles = toState.data.authorizedRoles;
            logger.info('current authorizedRoles:' + authorizedRoles);

            var isAuthorized = AuthService.isAuthorized(authorizedRoles);
            logger.debug('isAuthorized:' + isAuthorized);

            if (!isAuthorized) {

                // When a user is not authorized to access the page
                //(because he’s not logged in or doesn’t have the right role),
                //the transition to the next page will be prevented,
                //so the user will stay on the current page.
                event.preventDefault();

                if (AuthService.isAuthenticated()) {
                    logger.debug('user is not allowed');
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                } else {
                    logger.debug('user is not logged in');
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                }

            }
        });

    }
]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'USER_ROLES',
    function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, USER_ROLES) {

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

            },

            data: {
                pageTitle: 'Home'
            }
        })


        .state('public.shopping', {
            url: '/shopping',

            views: {

                // the main template will be placed here (relatively named)
                // replace unnamed view '<div ui-view></div>'  in this state's parent state, 'home'.
                '': {
                    templateUrl: 'partials/global.index.html'
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

            },

            data: {
                pageTitle: 'Shopping List'
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


/***
 *               /$$       /$$
 *              | $$      | $$
 *      /$$$$$$ | $$$$$$$ | $$$$$$$
 *     /$$__  $$| $$__  $$| $$__  $$
 *    | $$$$$$$$| $$  \ $$| $$  \ $$
 *    | $$_____/| $$  | $$| $$  | $$
 *    |  $$$$$$$| $$  | $$| $$  | $$
 *     \_______/|__/  |__/|__/  |__/
 *
 *
 *
 *                                    /$$                       /$$     /$$
 *                                   |__/                      | $$    |__/
 *     /$$$$$$$   /$$$$$$  /$$    /$$ /$$  /$$$$$$   /$$$$$$  /$$$$$$   /$$  /$$$$$$  /$$$$$$$
 *    | $$__  $$ |____  $$|  $$  /$$/| $$ /$$__  $$ |____  $$|_  $$_/  | $$ /$$__  $$| $$__  $$
 *    | $$  \ $$  /$$$$$$$ \  $$/$$/ | $$| $$  \ $$  /$$$$$$$  | $$    | $$| $$  \ $$| $$  \ $$
 *    | $$  | $$ /$$__  $$  \  $$$/  | $$| $$  | $$ /$$__  $$  | $$ /$$| $$| $$  | $$| $$  | $$
 *    | $$  | $$|  $$$$$$$   \  $/   | $$|  $$$$$$$|  $$$$$$$  |  $$$$/| $$|  $$$$$$/| $$  | $$
 *    |__/  |__/ \_______/    \_/    |__/ \____  $$ \_______/   \___/  |__/ \______/ |__/  |__/
 *                                        /$$  \ $$
 *                                       |  $$$$$$/
 *                                        \______/
 */
app.config(['$translateProvider', 'eehNavigationProvider', function(
    $translateProvider, eehNavigationProvider) {


    //add navbar
    eehNavigationProvider.menuItem('myNavbar.home', {
            text: 'Home',
            iconClass: 'glyphicon-home',
            weight: -10,
            href: '#'
        })
        .menuItem('myNavbar.shopping', {
            text: 'Shopping',
            iconClass: 'glyphicon-gift',
            weight: -8,
            state: 'public.shopping',
            // href: '#'
        })
        .menuItem('myNavbar.conf', {
            text: 'Settings',
            iconClass: 'glyphicon-cog',
            weight: -6,
            state: 'public.conf',
            // href: '#'
        });

    //user info
    eehNavigationProvider
        .menuItem('myNavbar.user', {
            text: 'KEN',
            iconClass: 'glyphicon-user'
        })


    .menuItem('myNavbar.user.profile', {
        text: 'Profile',
        iconClass: 'glyphicon-eye-open',
        state: 'myNavbar.user.profile'
    })

    .menuItem('myNavbar.user.divider1', {
        isDivider: true
    })


    .menuItem('myNavbar.user.logout', {
        text: 'Logout',
        iconClass: 'fa fa-sign-out',
        state: 'publig.logout'
    })

    //language
    var setLanguage = function(languageKey, languageName) {
        eehNavigationProvider.menuItem('myNavbar.language').text = languageName;
        $translateProvider.use(languageKey);
    };

    eehNavigationProvider
        .menuItem('myNavbar.language', {
            text: 'English',
            iconClass: 'glyphicon-globe',
            weight: 0
        })
        .menuItem('myNavbar.language.en', {
            text: 'English',
            click: function() {
                setLanguage('en', this.text);
            },
            weight: 1
        })
        .menuItem('myNavbar.language.de', {
            text: 'Deutsch',
            click: function() {
                setLanguage('de', this.text);
            },
            weight: 0
        });

    //add sidebar
    eehNavigationProvider
        .menuItem('foo.user', {
            text: 'Me',
            iconClass: 'fa-user'
        })
        .menuItem('foo.user.profile', {
            text: 'User Profile',
            iconClass: 'fa-user',
            href: '/user-profile'
        });

    // Add a menu item that links to "/home" to the "bar" menu.
    eehNavigationProvider
        .menuItem('bar.home', {
            text: 'Home',
            iconClass: 'fa-home',
            href: '/home'
        });
}]);



/***
 *     /$$        /$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$$$ /$$$$$$$
 *    | $$       /$$__  $$ /$$__  $$ /$$__  $$| $$_____/| $$__  $$
 *    | $$      | $$  \ $$| $$  \__/| $$  \__/| $$      | $$  \ $$
 *    | $$      | $$  | $$| $$ /$$$$| $$ /$$$$| $$$$$   | $$$$$$$/
 *    | $$      | $$  | $$| $$|_  $$| $$|_  $$| $$__/   | $$__  $$
 *    | $$      | $$  | $$| $$  \ $$| $$  \ $$| $$      | $$  \ $$
 *    | $$$$$$$$|  $$$$$$/|  $$$$$$/|  $$$$$$/| $$$$$$$$| $$  | $$
 *    |________/ \______/  \______/  \______/ |________/|__/  |__/
 *
 *
 *
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
 *
 *
 */
app.config(function(avLogProvider, avLevel) {
    // console.log(avLogProvider.$get());
    var myLogConfig = {
        //set a default log level - this will be used if someone logs under a category that is not defined below
        loglevel: avLevel.DEBUG, //TRACE, DEBUG, INFO, WARN, ERROR
        //these are the configured channels for logging - each channel can have it's own threshold
        //only log statements above the threshould will be output to the underlying avLog
        category: {

            AppRun: avLevel.DEBUG,

            //services
            AuthInterceptor: avLevel.DEBUG,
            AuthService: avLevel.DEBUG,

            //controller
            HeaderCtrl: avLevel.DEBUG,
            LoginCtrl: avLevel.DEBUG
        }
    };
    avLogProvider.$get().setConfig(myLogConfig);
    //in other projects - this works, TODO find out why
    // avLogProvider.$get[1]().setConfig(myLogConfig);
    //there is now a convenience method: return AVaughanLogging.get(avLogProvider, myLogConfig);

})
