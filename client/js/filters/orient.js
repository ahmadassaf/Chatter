define(['./module'], function (filters) {

    'use strict';

    return filters.filter('orient', ['authentication', function (authentication) {
        return function (sender, isMain) {
        		var orientation = String(sender) == authentication.user.username ? "right" : "left";
        		if (!isMain) return 'pos-' + orientation;
        			else return orientation;
        }
    }]);
});
