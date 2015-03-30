var express        = require('express');
var mongoose       = require('mongoose');
var passport       = require('passport');
var flash          = require('connect-flash');
var morgan         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var session        = require('express-session');

var configDB       = require('./configs/database.js');
var passportConfig = require('./configs/passport.js');

var app            = express();
var port           = process.env.PORT || 8080;

// connect to our database with the url defined in the config file
mongoose.connect(configDB.url);

// setting up the express application

// morgan is a HTTP request logger middleware for node.js to log the requests directly on the console
app.use(morgan('dev'));
// Used to be able to read cookies for authentication
app.use(cookieParser());
// Used to parse information embedded in html forms
app.use(bodyParser());

// Set up Views related configurations (Template Enginer used and Views path)
app.set('view engine', 'ejs');
app.set('views', __dirname + '/client/views');

// required for passport
app.use(session({ secret: passportConfig.secret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// start the server and listen on the defined port
app.listen(port);
console.log('Chatter Application up and running on port: ' + port);