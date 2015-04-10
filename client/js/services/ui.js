// These are the services designed to interact with the backend/server of the application

define(['./module', 'classie'], function(services, classie) {

    'use strict';

    services.factory('ui', function() {

    	return {
    		activateOverlay : function($scope, Modernizr) {
					var overlay            = document.querySelector( 'div.overlay' );
					var transEndEventNames = {
						'WebkitTransition': 'webkitTransitionEnd',
						'MozTransition'   : 'transitionend',
						'OTransition'     : 'oTransitionEnd',
						'msTransition'    : 'MSTransitionEnd',
						'transition'      : 'transitionend'
					};
					var transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ];
					var support           = { transitions : Modernizr.csstransitions };
					var s                 = Snap( overlay.querySelector( 'svg' ) );
					var path              = s.select( 'path' );
					var pathConfig        = {
						from: path.attr( 'd' ),
						to  : overlay.getAttribute( 'data-path-to' )
					};

			    $scope.toggleOverlay = function toggleOverlay() {
			      if( classie.has( overlay, 'open' ) ) {
			        classie.remove( overlay, 'open' );
			        classie.add( overlay, 'close' );

			        var onEndTransitionFn = function( ev ) {
			          classie.remove( overlay, 'close' );
			        };

			        // Clearing the form when we close the modal
			        if (classie.has( overlay, 'close' )) {
			        	document.querySelector( 'form.registrationForm' ).reset();
			        }

			        path.animate( { 'path' : pathConfig.from }, 400, mina.linear, onEndTransitionFn );
			      }
			      else if( !classie.has( overlay, 'close' ) ) {
			        classie.add( overlay, 'open' );
			        path.animate( { 'path' : pathConfig.to }, 400, mina.linear );
			      }
			    }
    		},

    		activateModal: function() {
			    var overlay = document.querySelector( '.md-overlay' );

			    [].slice.call( document.querySelectorAll( '.md-trigger' ) ).forEach( function( el, i ) {

			      var modal = document.querySelector( '#' + el.getAttribute( 'data-modal' ) ),
			        close = modal.querySelector( '.md-close' );

			      function removeModal( hasPerspective ) {
			        classie.remove( modal, 'md-show' );

			        if( hasPerspective ) {
			          classie.remove( document.documentElement, 'md-perspective' );
			        }
			      }

			      function removeModalHandler() {
			        removeModal( classie.has( el, 'md-setperspective' ) );
			      }

			      el.addEventListener( 'click', function( ev ) {
			        classie.add( modal, 'md-show' );
			        overlay.removeEventListener( 'click', removeModalHandler );
			        overlay.addEventListener( 'click', removeModalHandler );

			        if( classie.has( el, 'md-setperspective' ) ) {
			          setTimeout( function() {
			            classie.add( document.documentElement, 'md-perspective' );
			          }, 25 );
			        }
			      });

			      close.addEventListener( 'click', function( ev ) {
			        ev.stopPropagation();
			        removeModalHandler();
			      });

			    });
    		}

    	}

    });

 });


