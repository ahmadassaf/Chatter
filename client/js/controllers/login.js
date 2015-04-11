define(['./module', 'svg'], function(controllers) {
	'use strict';
	controllers.controller('login', ['$rootScope', '$scope', '$state', 'authentication', 'ui', function ($rootScope, $scope, $state, authentication, UI) {

    $scope.loginEmail        = "";
    $scope.loginPassword     = "";

    $scope.login = function() {

      authentication.login({
      	// Handle the fetching of the data from the UI via the Angular scope
				email   : $scope.loginEmail,
				password: $scope.loginPassword

      },

      // Handle the response back from the server based on the access/failure of the login process
      function() {
      	// If the login process is successfull, then route the user to his homepage
      	$state.go('user.chat');
      },
      function(err) {
      	// If the login fails then show an appropriate message with the error to the user and stay on the current page
        $scope.loginInfoMessage = err;
        $scope.showLoginError   = true;
      });
    };

    // Attach suitable UI handlers, functions and event listeners
    UI.activateOverlay($scope, $rootScope, Modernizr);
    UI.activateModal($scope);
    UI.activateFancyInput();

  }]);
});