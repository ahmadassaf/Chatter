define(['./module', ], function(controllers) {

	'use strict';

	controllers.controller('chat', ['$scope', 'socket', function ($scope, socket) {

        socket.on('news', function (data) {
            console.log(data);
            socket.emit('my other event', { my: 'data' });
          });

  }]);
});