var _              = require('underscore');
var path           = require('path')
var authentication = require('./controllers/authentication')
var userRoles      = require('../client/js/routingConfig').userRoles;
var accessLevels   = require('../client/js/routingConfig').accessLevels;


module.exports = function(app, passport) {

    var routes = [
        {
            path: '/partials/*',
            httpMethod: 'GET',
            middleware: [function (req, res) {
                var requestedView = path.join('./', req.url);
                res.render(requestedView);
            }]
        },
        {
            path: '/register',
            httpMethod: 'POST',
            middleware: [function (req, res, next) {
                  // generate the authenticate method and pass the req/res
                  passport.authenticate('signup', function(err, user, info) {
                    if (err) { return next(err); }
                    if (!user) {
                        return res.send(409, "User already exists");
                    } else {
                        req.logIn(user, function(err) {
                            if(err) return next(err);
                            else {
                                connectedUser             = { "role": user.role, "username": user.username };
                                req.session.connectedUser = connectedUser;
                                return res.send(200, connectedUser);
                            }
                        });
                    }

                  })(req, res, next);
                }
            ]
        },

        // All other get requests should be handled by AngularJS's client-side routing system
        {
            path: '/*',
            httpMethod: 'GET',
            middleware: [function(req, res) {
                var role = userRoles.public, username = '';

                if(req.session.connectedUser) {
                    role     = req.session.connectedUser.role;
                    username = req.session.connectedUser.username;
                }
                res.cookie('user', JSON.stringify({
                    'username': username,
                     'role': role
                }));
                res.render('index');
            }]
        }
    ];

    _.each(routes, function(route) {
        route.middleware.unshift(isLoggedIn);
        var args = _.flatten([route.path, route.middleware]);

        switch(route.httpMethod.toUpperCase()) {
            case 'GET':
                app.get.apply(app, args);
                break;
            case 'POST':
                app.post.apply(app, args);
                break;
            case 'PUT':
                app.put.apply(app, args);
                break;
            case 'DELETE':
                app.delete.apply(app, args);
                break;
            default:
                throw new Error('Invalid HTTP method specified for route ' + route.path);
                break;
        }
    });

    // Check if the passport.js has a valid user session to authenticate the user or send/keep the user at home
    function isLoggedIn(req, res, next) {

        role = !req.session.connectedUser ? userRoles.public : userRoles.user;

        var method      = req.route.stack[0].method;
        var accessLevel = _.findWhere(routes, { path: req.route.path, httpMethod: method.toUpperCase() }).accessLevel || accessLevels.public;

        if(!(accessLevel.bitMask & role.bitMask)) return res.send(403);
        return next();
    }
}