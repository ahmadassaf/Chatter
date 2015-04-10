define(['./module', 'svg'], function(controllers) {
	'use strict';
	controllers.controller('login', ['$rootScope', '$scope', '$state', 'authentication', 'ui', function ($rootScope, $scope, $state, authentication, UI) {

    $scope.email             = "";
    $scope.password          = "";
    $scope.registrationError = "";
    $scope.showError         = false;

    $scope.login = function() {

      authentication.login({
      	// Handle the fetching of the data from the UI via the Angular scope
				email   : $scope.email,
				password: $scope.password

      },

      // Handle the response back from the server based on the access/failure of the login process
      function() {
      	// If the login process is successfull, then route the user to his homepage
      	$state.go('user.chat');
      },
      function(err) {
      	// If the login fails then show an appropriate message with the error to the user and stay on the current page
      	$scope.err = err;
      	$scope.showError = true;
      });
    };

    UI.activateOverlay($scope, Modernizr);
    UI.activateModal($scope, Modernizr);

  }]);
});