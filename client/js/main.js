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
        'angular-sanitize'        : '../lib/angular-sanitize/angular-sanitize',
        'socketio'                : '../lib/socket.io-client/socket.io',
        'underscore'              : '../lib/underscore/underscore',
        'classie'                 : '../lib/misc/classie',
        'svg'                     : '../lib/misc/snap.svg-min',
        'moment'                  : '../lib/moment/moment',
        'angular-moment'          : '../lib/angular-moment/angular-moment'
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
        'angular-moment': {
            deps: ['angular']
        },
        'angular-sanitize': {
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
        './bootstrap',
        '../lib/misc/modernizr.js'
    ],
    urlArgs: "bust=" + (new Date()).getTime()
});
