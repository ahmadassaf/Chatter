/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define(['./app'], function (app) {

    'use strict';

    return app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    var access = routingConfig.accessLevels;

    /* Define the Angular.js routes that matches the pre-defined roles and access levels
     * Since we have two main roles (other then the public ones [anon, user]), we will define mainly:
     * 1) routes for anon:
     *      The homepage will directly contain the partial template for login
     *      anon users will also be able to register and in the end access to 404 pages for unhandled errors
     * 2) authenticated users:
     *     They will be able to access the home where the chat will occur
     *     They will be able to access their profiles
     */

    $stateProvider
        .state('public', {
            abstract: true,
            template: "<ui-view/>",
            data: {
                access: access.public
            }
        })
        .state('public.home', {
            url        : '/',
            templateUrl: '/partials/login',
            controller : 'login'
        });

    $stateProvider
        .state('anon', {
            abstract: true,
            template: "<ui-view/>",
            data: {
                access: access.anon
            }
        })
        .state('anon.register', {
            url: '/register/',
            templateUrl: '/partials/register',
            controller : 'register'
        })
        .state('anon.404', {
            url        : '/404/',
            templateUrl: 'partials/404'
        });

    $stateProvider
        .state('user', {
            abstract: true,
            template: "<ui-view/>",
            data: {
                access: access.user
            }
        })
        .state('user.chat', {
            url        : '/chat/',
            templateUrl: 'partials/chat'
        })
        .state('user.profile', {
            url        : '/profile/',
            templateUrl: 'partials/profile'
        });

  // Any uncatchable route will redirect to 404
  $urlRouterProvider.otherwise('/404');

    // FIX for trailing slashes. Gracefully "borrowed" from https://github.com/angular-ui/ui-router/issues/50
    $urlRouterProvider.rule(function($injector, $location) {

        if($location.protocol() === 'file') return;

        // Note: misnomer. This returns a query object, not a search string
        var path   = $location.path();
        var search = $location.search();
        var params = [];

        // check to see if the path already ends in '/'
        if (path[path.length - 1] === '/') return;

        // If there was no search string / query params, return with a `/`
        if (Object.keys(search).length === 0) return path + '/';

        // Otherwise build the search string and return a `/?` prefix
        angular.forEach(search, function(v, k){
            params.push(k + '=' + v);
        });
        return path + '/?' + params.join('&');
    });

    // Configure how the application deep linking paths are stored
    $locationProvider.html5Mode(true);

    // Catch any error  (403, etc.) sent from the server and redirect the user back to the login screen
    $httpProvider.interceptors.push(function($q, $location) {
        return {
            'responseError': function(response) {
                if(response.status === 403) {
                    $location.path('/');
                }
                return $q.reject(response);
            }
        };
    });

    }]).run(['$rootScope', '$state', 'authentication', function ($rootScope, $state, authentication) {

        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

            if (!authentication.authorize(toState.data.access)) {
                $rootScope.error = "Trying to access a route you don't have access to ?!";
                event.preventDefault();
            }

            /*
            if (fromState.name === "" && authentication.isLoggedIn()) {
                $state.go('user.chat');
                event.preventDefault();
            }
            */
        });
    }]);
});
