define(['./module', 'underscore'], function(controllers, _) {

	'use strict';

    var io, currentUser;

	controllers.controller('chat', ['$rootScope', '$scope', '$state', 'authentication', 'socket', function ($rootScope, $scope, $state, authentication, socket) {

        $scope.messages = [];
        $scope.users    = {};

        io              = socket;
        currentUser     = authentication.user;

        // Get the list of connected users and then join the list
        socket.emit('init', currentUser, function (init) {
            $scope.users    = init.connectedUsers;
            $scope.messages = init.messages;
        });

        socket.on('user:join', function(user){
            $scope.users[user.username] = user;
        });

        socket.on('user:leave', function(user){
            // Check if the user:leave signal is from another window where the usal is logged in and log him out
            if (user.username == currentUser.username) {

                authentication.logout(function() { },

                    function() { $state.go('public.home');},
                    function(err){ $rootScope.error = "Failed to Logout"; });

            } else {
                $scope.users = _.omit($scope.users, user.username);
            }

        });

        socket.on('user:message', function(message){
            $scope.messages.push(message);
        });

        $scope.sendMessage = function() {
            // Prepare the message object to be sent to the server and rendered on the frontend
            var message = {
                sender      : currentUser.username,
                message     : $scope.message,
                timestamp   : new Date().getTime()
            };
            // Emit the message to the server side
            io.emit('chat', message);
            $scope.messages.push(message);

            $scope.message = '';
        };
  }]);
});