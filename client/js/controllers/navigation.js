define(['./module','../appConfig'], function(controllers,appConfig) {

	'use strict';

	controllers.controller('navigation', ['$rootScope', '$scope', '$state', 'authentication', 'socket', function ($rootScope, $scope, $state, auth, socket) {

			$scope.user         = auth.user;
			$scope.userRoles    = auth.userRoles;
			$scope.accessLevels = auth.accessLevels;

	    $scope.logout = function() {
	    		socket.emit('user:leave', auth.user);
	        auth.logout(function() {
	        }, function() {
	        		$state.go('public.home');
	        }, function(err){
	        		$rootScope.error = "Failed to Logout";
	        });
	    };
	}]);
});