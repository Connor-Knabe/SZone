var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var mongoose = require('mongoose');


//Models
var model = require('../models.js');

module.exports = function (app, passport) {
	
	// Password verification
	model.userSchema.methods.comparePassword = function(candidatePassword, cb) {
		bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
			if(err) return cb(err);
			cb(null, isMatch);
		});
	};
	var User = mongoose.model('User', model.userSchema);
	
	passport.serializeUser(function(user, done) {
		done(null, user.email);
	});
	
	passport.deserializeUser(function(email, done) {
		User.findOne( { email: email } , function (err, user) {
			done(err, user);
		});
	});
	
	console.log("test");
	
	
	// Bcrypt middleware
	model.userSchema.pre('save', function(next) {
		var user = this;
		if(!user.isModified('password')) return next();
		bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
			if(err) return next(err);
	
			bcrypt.hash(user.password, salt, function(err, hash) {
				if(err) return next(err);
				user.password = hash;
				next();
			});
		});
	});
	
	// Password verification
	model.userSchema.methods.comparePassword = function(candidatePassword, cb) {
		bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
			if(err) return cb(err);
			cb(null, isMatch);
		});
	};
	
	
	passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
		function(email, password, done) {
		  	User.findOne({ email: email }, function(err, user) {
		    	if (err) { return done(err); }
		    	if (!user) { return done(null, false, { message: 'Unknown user ' + email }); }
		    	user.comparePassword(password, function(err, isMatch) {
			  		if (err) return done(err);
			      	if(isMatch) {
			        	return done(null, user);
			      	} else {
			        	return done(null, false, { message: 'Invalid password' });
			      	}
		    	});
		  	});
	}));
}