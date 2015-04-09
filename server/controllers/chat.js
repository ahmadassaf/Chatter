var User       = require('../models/user.js');

module.exports = function(io) {

	var connectedUsers = [];

	io.on('connection', function (socket) {

		// On initialization, send the list of current connected users
		socket.on('init', function(user, fn){

			// The connected username
			var username = user.username;

			// Check if the user is not already connected and add him
			if (connectedUsers.indexOf(username) === -1) {
				// Send to the callback the list of connected users
				fn(connectedUsers);

				connectedUsers.push(username);
				// Broadcast a message for connected user on the new user joining
			  socket.broadcast.emit('user:join', user);
			  console.log(user.username + " has just joined us. We have " + connectedUsers.length + " connected users now !" );
			}
		});

		socket.on('chat', function(message){
			socket.broadcast.emit('user:message', message);
			console.log(message);
		});

		socket.emit('init', {'connectedUsers' : connectedUsers});

		console.log("We have " + connectedUsers.length + " connected users now !" );
	});

};
