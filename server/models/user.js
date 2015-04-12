var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var _        = require('underscore')

var user = mongoose.Schema({

		email    : String,
		username : String,
		password : String,
		firstname: String,
		lastname : String,
		role     : {bitMask:Number,title:String}

});

// generate a hash for the password entered by the user
user.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Check if the password entere is the same as the hashed one in store
user.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', user);
