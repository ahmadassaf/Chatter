/**
 * configure RequireJS
 * prefer named modules to long paths, especially for version mgt
 * or 3rd party libraries
 */
require.config({

    paths: {
        'angular'                 : '../lib/angular/angular',
        'angular-route'           : '../lib/angular-route/angular-route',
        'domReady'                : '../lib/requirejs-domready/domReady',
        'angular-translate-static': '../lib/angular-translate-loader-static-files/angular-translate-loader-static-files.min',
        'angular-cookies'         : '../lib/angular-cookies/angular-cookies',
        'angular-ui-router'       : '../lib/angular-ui-router/release/angular-ui-router',
        'socketio'                : '../lib/socket.io-client/socket.io'
    },

    /**
     * for libs that either do not support AMD out of the box, or
     * require some fine tuning to dependency mgt'
     */
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-cookies': {
            deps: ['angular']
        },
        'angular-ui-router': {
            deps: ['angular']
        }
    },

    deps: [
        './bootstrap'
    ],
    urlArgs: "bust=" + (new Date()).getTime()
});
