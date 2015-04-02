// These are the services designed to interact with the backend/server of the application

define(['./module'], function(services) {

    'use strict';

    services.factory('authentication', function($http, $cookieStore) {

        var accessLevels = routingConfig.accessLevels;
        var userRoles    = routingConfig.userRoles;
        var currentUser  = $cookieStore.get('user') || { username: '', role: userRoles.public };

        // always remove the cookie as soon it reaches out
        $cookieStore.remove('user');

        function changeUser(user) {
            angular.extend(currentUser, user);
        }

        return {
            authorize: function(accessLevel, role) {
                if (role === undefined) {
                    role = currentUser.role;
                }
                return accessLevel.bitMask & role.bitMask;
            },
            isLoggedIn: function(user) {
                if (user === undefined) {
                    user = currentUser;
                }
                console.log(user);
                return user.role.title === userRoles.user.title;
            },
            register: function(user, success, error) {
                $http.post('/register', user).success(function(res) {
                    changeUser(res);
                    success();
                }).error(error);
            },
            login: function(user, success, error) {
                $http.post('/login', user).success(function(user) {
                    changeUser(user);
                    success(user);
                }).error(error);
            },
            logout: function(success, error) {
                $http.post('/logout').success(function() {
                    changeUser({
                        username: '',
                        role: userRoles.public
                    });
                    success();
                }).error(error);
            },

            accessLevels: accessLevels,
            userRoles: userRoles,
            user: currentUser
        }
    });
});