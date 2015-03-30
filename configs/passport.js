var LocalStrategy = require('passport-local').Strategy;

var User = require('../server/models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

	/*
		Passport sesstion setup is required to persist login sessions
		We need to serialize and de-serialize users
	*/
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use('signup', new LocalStrategy({

		// The default local strategy uses firstname and lastname, we want to use the email instead
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true

	}, function(req, email, password, done) {

		process.nextTick(function() {
			//  Check if the user already exists
			User.findOne({

				'local.email': email

			}, function(err, user) {
				// Return if any error happens
				if (err) return done(err);
				// Check to see if the email used already exists
				if (user) {
					return done(null, false, req.flash('signupMessage', 'Sorry ! Apprently there is already a registered user with this email address'));
				} else {
					// Things look good .. create and add the user
					var newUser = new User();
					newUser.local.email = email;
					newUser.local.password = newUser.generateHash(password);

					newUser.save(function(err) {
						if (err) throw err;
						return done(null, newUser);
					});
				}
			});
		});
	}));


};