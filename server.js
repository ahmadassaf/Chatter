var express  = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var socket   = require('socket.io')

var app      = express();

var env      = process.env.NODE_ENV || 'development';
var config   = require('./configs/config')[env];
var port     = process.env.PORT || config.port || 8080;

// connect to our database with the url defined in the config file
mongoose.connect(config.db);

require('./configs/app.js')(__dirname, app, express, passport);
require('./configs/passport.js')(passport);

// start the server and listen on the defined port
var io = socket.listen(app.listen(port));

// Add the roots file to be included
require('./server/routes.js')(app, passport, io);

exports = module.exports = app;

console.log('Chatter Application up and running on port: ' + port);