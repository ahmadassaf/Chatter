var User      = require('../models/user.js');

module.exports = function(passport){

    return {
        register: function(req, res, next) {
            // generate the authenticate method and pass the req/res
            passport.authenticate('signup', function(err, user, info) {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.send(409, "User already exists");
                } else {
                    req.logIn(user, function(err) {
                        if (err) return next(err);
                        else {
                            connectedUser = {
                                "role": user.role,
                                "username": user.username
                            };
                            req.session.connectedUser = connectedUser;
                            return res.send(200, connectedUser);
                        }
                    });
                }

            })(req, res, next);
        },

        login: function(req, res, next) {

        },

        logout: function(req, res) {
            req.session.connectedUser = null;
            req.logout();
            res.send(200);
        }
    }

};