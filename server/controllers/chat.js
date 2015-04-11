var User       = require('../models/user.js');
var _          = require('underscore');

module.exports = function(io) {

	var connectedUsers = {};

	io.on('connection', function (socket) {

		// On initialization, send the list of current connected users
		socket.on('init', function(user, fn){

			// The connected username
			var username = user.username;
			var user     = _.extend(user,{'initials': user.username.replace(/\W*(\w)\w*/g, '$1').toUpperCase()});

			// Check if the user is not already connected and add him
			if (_.has(connectedUsers, username)) {
				// Send to the callback the list of connected users
				fn(_.values(_.omit(connectedUsers,username)));
			} else {
				fn(_.values(connectedUsers));
				connectedUsers[username] = user;
				// Broadcast a message for connected user on the new user joining
			  socket.broadcast.emit('user:join', user);
			  console.log(user.username + " has just joined us. We have " + connectedUsers.size + " connected users now !" );
			}
		});

		socket.on('chat', function(message){
			socket.broadcast.emit('user:message', message);
		});

		socket.emit('init', {'connectedUsers' : connectedUsers});

		console.log("We have " + connectedUsers.length + " connected users now !" );
	});

};
