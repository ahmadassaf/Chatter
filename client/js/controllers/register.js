define(['./module'], function(controllers) {
	'use strict';
	controllers.controller('register', ['$rootScope', '$scope', '$state', 'authentication', function ($rootScope, $scope, $state, auth) {

			$scope.firstname = "";
			$scope.lastname  = "";
			$scope.email     = "";
			$scope.password  = "";
			$scope.gender    = "";

    $scope.register = function() {
      auth.register({
      	username : $scope.username,
      	email    : $scope.email,
      	firstName: $scope.firstname,
      	lastName : $scope.lastname,
      	gender   : $scope.gender,
      	password : $scope.password
      },
      function() {
      	$state.go('user.profile');
      	console.log("OK");
      },
      function(err) {
      	console.log(err);
      	$scope.err = err;
      	$scope.showError = true;
      });
    };
	}]);
});