define(['./module'], function (filters) {

    'use strict';

    return filters.filter('orient', ['authentication', function (authentication) {
        return function (sender) {
        		var orientation = String(sender) == authentication.user.username ? "right" : "left";
        		return 'pull-' + orientation;

        }
    }]);
});
