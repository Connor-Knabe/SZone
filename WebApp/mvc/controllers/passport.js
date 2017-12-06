var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;
var mongoose = require('mongoose');

//Models
var userModel = require('../models/user.js');

module.exports = function(app, passport, User) {
    passport.serializeUser(function(user, done) {
        done(null, user.email);
    });

    passport.deserializeUser(function(email, done) {
        User.findOne({ email: email }, function(err, user) {
            done(err, user);
        });
    });

    // Bcrypt middleware
    userModel.userSchema.pre('save', function(next) {
        var user = this;
        if (!user.isModified('password')) return next();
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    });

    // Password verification
    userModel.userSchema.methods.comparePassword = function(
        candidatePassword,
        cb
    ) {
        bcrypt.compare(candidatePassword, this.password, function(
            err,
            isMatch
        ) {
            if (err) return cb(err);
            cb(null, isMatch);
        });
    };

    passport.use(
        new LocalStrategy(
            { usernameField: 'email', passwordField: 'password' },
            function(email, password, done) {
                User.findOne({ email: email }, function(err, user) {
                    if (err) {
                        console.error('error finding user', err);
                        return done(err);
                    }
                    if (!user) {
                        console.error('error no user found', user);
                        return done(null, false, {
                            message: 'Unknown user ' + email
                        });
                    }
                    console.log('looking for user');
                    user.comparePassword(password, function(err, isMatch) {
                        console.log('comparing password');
                        if (err) return done(err);
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, {
                                message: 'Invalid password'
                            });
                        }
                    });
                });
            }
        )
    );
};
