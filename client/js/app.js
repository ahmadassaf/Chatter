/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define([
    'angular',
    'angular-route',
    'angular-cookies',
    'angular-ui-router',
    'angular-ngUpload',
    './controllers/index',
    './directives/index',
    './filters/index',
    './services/index',
    './routingConfig',
    './appConfig'
], function (angular) {
    'use strict';

    return angular.module('app', [
        'ngCookies',
        'app.services',
        'app.controllers',
        'app.directives',
        'app.filters',
        'ngRoute',
        'pascalprecht.translate',
        'ui.router',
        'ngUpload'
    ]);
});
