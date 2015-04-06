define(['./module'], function(controllers) {
	'use strict';
	controllers.controller('register', ['$rootScope', '$scope', '$state', 'authentication', function ($rootScope, $scope, $state, authentication) {

      $scope.firstname = "";
      $scope.lastname  = "";
      $scope.email     = "";
      $scope.password  = "";
      $scope.gender    = "";

    $scope.register = function() {

      authentication.register({
      	// Handle the fetching of the data from the UI via the Angular scope
      	username : $scope.username,
      	email    : $scope.email,
      	firstName: $scope.firstname,
      	lastName : $scope.lastname,
      	gender   : $scope.gender,
      	password : $scope.password

      },

      // Handle the response back from the server based on the access/failure of the registration process
      function() {
      	// If the registration process is successfull, then route the user to his homepage
      	$state.go('user.chat');
      },
      function(err) {
      	// If the registration fails then show an appropriate message with the error to the user and stay on the current page
      	$scope.err = err;
      	$scope.showError = true;
      });
    };
	}]);
});