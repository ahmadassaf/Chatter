var express        = require('express');
var mongoose       = require('mongoose');
var passport       = require('passport');
var flash          = require('connect-flash');
var morgan         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var session        = require('express-session');
var path      		 = require('path');
var User           = require('./server/models/user.js');

var configDB       = require('./configs/database.js');

var app            = express();
var port           = process.env.PORT || 8080;

// connect to our database with the url defined in the config file
mongoose.connect(configDB.url);

// setting up the express application

// Set up Views related configurations (Template Enginer used and Views path)
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'client')));
app.set('views', __dirname + '/client/views');

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

require('./configs/passport.js')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());


// Add the roots file to be included
require('./server/routes.js')(app, passport);

// start the server and listen on the defined port
app.listen(port);
console.log('Chatter Application up and running on port: ' + port);