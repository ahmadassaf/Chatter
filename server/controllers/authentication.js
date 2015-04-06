var User      = require('../models/user.js');

module.exports = {

 register: function(req, res, next) {

        var email       = req.body.email;
        var username    = req.body.username;
        var password    = req.body.password;
        var firstName   = req.body.firstName;
        var lastName    = req.body.lastName;
        var role        = req.body.role;

        User.addUser(email, username, password, firstName, lastName, role, function(err, user) {
            console.log("adding user");
            if (err === 'UserAlreadyExists') {
                console.log('UserAlreadyExists');
                return res.send(403, "User already exists");
            }
            else {
                console.log("OK");
                if(err) return res.send(500);

                req.logIn(user, function(err) {
                    console.log("login");
                    if(err) next(err);
                    else {
                        connectedUser = { "role": user.role, "username": user.username };
                        req.session.connectedUser = connectedUser;
                        res.json(200, connectedUser);
                    }
                });
            }
        });
    },

    login: function(req, res, next) {
        passport.authenticate('local', function(err, user) {
            if(err)     { return next(err); }
            if(!user)   { return res.send(400); }

            req.logIn(user, function(err) {
                if(err) {
                    return next(err);
                }

                if(req.body.rememberme) req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7;

                user = { "role": user.role, "username": user.basic_information.username };
                req.session.connectedUser = user;

                res.json(200,user);
            });
        })(req, res, next);
    },

    logout: function(req, res) {
        req.session.connectedUser = null;
        req.logout();
        res.send(200);
    }
};