var path         = require('path');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var flash        = require('connect-flash');

module.exports = function(directory, app, express, passport) {
	// setting up the express application

	// Set up Views related configurations (Template Enginer used and Views path)
	app.set('view engine', 'jade');
	app.use(express.static(path.join(directory, 'client')));
	app.set('views', directory + '/client/views');

	// morgan is a HTTP request logger middleware for node.js to log the requests directly on the console
	app.use(morgan('dev'));
	// Used to be able to read cookies for authentication
	app.use(cookieParser());
	// Used to parse information embedded in html forms
	app.use(bodyParser());


	app.use(session({ secret: "hfV!p7HNF$HYSETF8jBn" }));

	/*
		The path of our passport object is important to note here
		We will create it at the very beginning of the file with var passport = require('passport')
		Then we pass it into our config/passport.js file for it to be configured
		Then we pass it to the server/routes.js file for it to be used in our routes.
	 */


	app.use(passport.initialize());
	app.use(passport.session());

	app.use(flash());
}