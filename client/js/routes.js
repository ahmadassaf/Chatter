/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define(['./app'], function (app) {

    'use strict';

    return app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    var access = routingConfig.accessLevels;

    // Public routes
    $stateProvider
        .state('public', {
            abstract: true,
            template: "<ui-view/>",
            data: {
                access: access.public
            }
        })
        .state('public.home', {
            url: '/',
            templateUrl: 'index',
            controller: 'Home'
        })
        .state('public.404', {
            url: '/404/',
            templateUrl: '/partials/404'
        });

    // Regular patient routes
    $stateProvider
        .state('user', {
            abstract: true,
            template: "<ui-view/>",
            data: {
                access: access.user
            }
        })
        .state('user.home', {
            url: '/home',
            templateUrl: '/partials/home'
        })
        .state('user.profile', {
            url: '/profile/',
            templateUrl: '/partials/profile',
            controller: 'profile'
        });

 $urlRouterProvider.otherwise('/404');

    // FIX for trailing slashes. Gracefully "borrowed" from https://github.com/angular-ui/ui-router/issues/50
    $urlRouterProvider.rule(function($injector, $location) {
        if($location.protocol() === 'file')
            return;

        var path = $location.path()
        // Note: misnomer. This returns a query object, not a search string
            , search = $location.search()
            , params
            ;

        // check to see if the path already ends in '/'
        if (path[path.length - 1] === '/') {
            return;
        }

        // If there was no search string / query params, return with a `/`
        if (Object.keys(search).length === 0) {
            return path + '/';
        }

        // Otherwise build the search string and return a `/?` prefix
        params = [];
        angular.forEach(search, function(v, k){
            params.push(k + '=' + v);
        });
        return path + '/?' + params.join('&');
    });

    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push(function($q, $location) {
        return {
            'responseError': function(response) {
                if(response.status === 401 || response.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(response);
            }
        };
    });

    }]).run(['$rootScope', '$state', 'auth', function ($rootScope, $state, auth) {

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        if (!auth.authorize(toState.data.access)) {
            $rootScope.error = "Trying to access a route you don't have access to ?!";
            event.preventDefault();

            if(fromState.url === '^') {
                if(auth.isLoggedIn()) {

                    if(auth.user)
                        $state.go('user.home');
                    else
                        $state.go('public.404');
                } else {
                    $rootScope.error = null;
                    $state.go('public.home');
                }
            }
        }
        });
    }]);
});
