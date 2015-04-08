var express      = require('express');
var mongoose     = require('mongoose');
var passport     = require('passport');
var socket       = require('socket.io')

var options      = require('./options.json')
var configDB     = require('./configs/database.js');

var app          = express();
var port         = process.env.PORT || options.port;

// connect to our database with the url defined in the config file
mongoose.connect(configDB.url);

require('./configs/app.js')(__dirname, app, express, passport);
require('./configs/passport.js')(passport);

// start the server and listen on the defined port
var io = socket.listen(app.listen(port));

// Add the roots file to be included
require('./server/routes.js')(app, passport, io);

console.log('Chatter Application up and running on port: ' + port);