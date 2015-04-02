define(['./module','../appConfig'], function(controllers,appConfig) {

	'use strict';

	controllers.controller('navigation', ['$rootScope', '$scope', '$location', 'authentication','$cookieStore', function ($rootScope, $scope, $location, auth, $cookieStore) {

			$scope.user         = auth.user;
			$scope.userRoles    = auth.userRoles;
			$scope.accessLevels = auth.accessLevels;

	    $scope.logout = function() {
	        auth.logout(function() {
	            $location.path('/');
	        }, function() {
	            $rootScope.error = "Failed to Logout";
	        });
	    };
	}]);
});