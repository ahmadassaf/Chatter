define(['./module'], function (directives) {

    'use strict';

    // This will control the show/hide of elements based on the access level defined in the directive

    directives.directive('accessLevel', ['auth', function (auth) {
	    return {
	        restrict: 'A',
	        link: function($scope, element, attrs) {

	            var prevDisp = element.css('display') , userRole , accessLevel;

	            $scope.user = auth.user;

	            $scope.$watch('user', function(user) {
	                if (user.role) userRole = user.role
	                updateCSS();
	            }, true);

	            attrs.$observe('accessLevel', function(al) {
	                if(al) accessLevel = $scope.$eval(al);
	                updateCSS();
	            });

	            function updateCSS() {
	                if(userRole && accessLevel) {
	                    !auth.authorize(accessLevel, userRole) ? element.css('display', 'none') : element.css('display', prevDisp);
	                }
	            }
	        }
	    };
    }]);
});
