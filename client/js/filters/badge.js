define(['./module', 'underscore'], function (filters, _) {

    'use strict';

    var colorPalette = {};
    var url          = 'http://placehold.it/50/';

    return filters.filter('badge', [function (authentication) {

        return function (username) {

            var color;

            if (_.has(colorPalette, username)) {
                color = colorPalette[username];
            } else {
                color                  = Math.floor(Math.random()*16777215).toString(16).toUpperCase();
                colorPalette[username] = color;
            }
            return url + color + '/fff&text=' + username.replace(/\W*(\w)\w*/g, '$1').toUpperCase();
        }
    }]);
});
