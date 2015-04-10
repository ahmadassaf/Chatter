define(['./module', 'classie', 'svg'], function(controllers, classie, svg) {
	'use strict';
	controllers.controller('login', ['$rootScope', '$scope', '$state', 'authentication', function ($rootScope, $scope, $state, authentication) {
console.log(Modernizr);
			$scope.email     = "";
			$scope.password  = "";

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

    // Handle the fancy login forms
    // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    if (!String.prototype.trim) {
        (function() {
            // Make sure we trim BOM and NBSP
            var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
            String.prototype.trim = function() {
                return this.replace(rtrim, '');
            };
        })();
    }

    [].slice.call( document.querySelectorAll( 'input.input__field' ) ).forEach( function( inputEl ) {
        // in case the input is already filled..
        if( inputEl.value.trim() !== '' ) {
            classie.add( inputEl.parentNode, 'input--filled' );
        }

        // events:
        inputEl.addEventListener( 'focus', onInputFocus );
        inputEl.addEventListener( 'blur', onInputBlur );
    } );

    function onInputFocus( ev ) {
        classie.add( ev.target.parentNode, 'input--filled' );
    }

    function onInputBlur( ev ) {
        if( ev.target.value.trim() === '' ) {
            classie.remove( ev.target.parentNode, 'input--filled' );
        }
    }

      var overlay = document.querySelector( 'div.overlay' ),
      transEndEventNames = {
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition'   : 'transitionend',
        'OTransition'     : 'oTransitionEnd',
        'msTransition'    : 'MSTransitionEnd',
        'transition'      : 'transitionend'
      },
      transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
      support = { transitions : Modernizr.csstransitions },
      s = Snap( overlay.querySelector( 'svg' ) ),
      path = s.select( 'path' ),
      pathConfig = {
        from : path.attr( 'd' ),
        to : overlay.getAttribute( 'data-path-to' )
      };

    $scope.toggleOverlay = function toggleOverlay() {
      console.log('toggling');
      if( classie.has( overlay, 'open' ) ) {
        classie.remove( overlay, 'open' );
        classie.add( overlay, 'close' );

        var onEndTransitionFn = function( ev ) {
          classie.remove( overlay, 'close' );
        };

        path.animate( { 'path' : pathConfig.from }, 400, mina.linear, onEndTransitionFn );
      }
      else if( !classie.has( overlay, 'close' ) ) {
        classie.add( overlay, 'open' );
        path.animate( { 'path' : pathConfig.to }, 400, mina.linear );
      }
    }

  }]);
});