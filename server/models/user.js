var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var user = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
        first_name   : String,
        last_name    : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }

});

// generate a hash for the password entered by the user
user.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Check if the password entere is the same as the hashed one in store
user.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', user);