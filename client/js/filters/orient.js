define(['./module'], function (filters) {

    'use strict';

    return filters.filter('orient', ['authentication', function (authentication) {
        return function (sender, isMain, isReverse) {

        		var orientation = String(sender) == authentication.user.username ? "right" : "left";

        		if (isReverse) {
        		 if (orientation == "right") orientation =  "left";
        				else orientation =  "right";
        		}

        		if (!isMain) orientation =  'pos-' + orientation;

        		return orientation;
        }
    }]);
});
