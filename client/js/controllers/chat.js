define(['./module', 'underscore'], function(controllers, _) {

	'use strict';

    var io, user;

	controllers.controller('chat', ['$scope', 'authentication', 'socket', function ($scope, authentication, socket) {

        $scope.messages = [];
        $scope.users    = [];
        io              = socket;
        user            = authentication.user;

        // Get the list of connected users and then join the list
        socket.emit('init', user, function (users) {
            $scope.users = users;
        });

        socket.on('user:join', function(user){
            console.log(user);
            console.log(user.username + " has just joined");
            $scope.users.push(user);
        });

        socket.on('user:message', function(message){
            $scope.messages.push(message);
        });

        $scope.sendMessage = function() {
            // Prepare the message object to be sent to the server and rendered on the frontend
            var message = {
                sender      : user.username,
                initials    : user.username.replace(/\W*(\w)\w*/g, '$1').toUpperCase(),
                message     : $scope.message
            };
            // Emit the message to the server side
            io.emit('chat', message);
            $scope.messages.push(message);

            $scope.message = '';
        };

  }]);
});