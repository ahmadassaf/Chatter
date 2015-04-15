var User       = require('../models/user.js');
var _          = require('underscore');

module.exports = function(io) {

	var connectedUsers = {};
	var messages       = [];

	io.on('connection', function (socket) {

		// On initialization, send the list of current connected users
		socket.on('init', function(user, fn){

			// Check if the user is not already connected and add him
			if (_.has(connectedUsers, user.username)) {
				// Send to the callback the list of connected users
				fn({'connectedUsers' : _.omit(connectedUsers, user.username), 'messages': messages});
			} else {
				fn({'connectedUsers' :connectedUsers, 'messages' : messages});
				connectedUsers[user.username] = user;
				// Broadcast a message for connected user on the new user joining
			  socket.broadcast.emit('user:join', user);
			  //console.log(user.username + " has just joined us. We have " +  _.size(connectedUsers) + " connected users now !" );
			}
		});

		socket.on('chat', function(message){
			messages.push(message);
			socket.broadcast.emit('user:message', message);
		});

		socket.on('user:leave', function(user){
			connectedUsers = _.omit(connectedUsers, user.username);
			socket.broadcast.emit('user:leave', user);
			//console.log(user.username + " has just left us. We have " +  _.size(connectedUsers) + " connected users now !" );
		});

		//console.log("We have " + _.size(connectedUsers) + " connected users now !" );

	});

};
