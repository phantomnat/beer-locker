/**
 * Created by pnrisk on 11/21/2015 AD.
 */

var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/users');

passport.use(new BasicStrategy(
    function (usename, password, callback) {
        User.findOne({username: usename}, function (err, user) {
            if (err) return callback(err);

            if (!user) return callback(null, false);

            user.verifyPassword(password, function (err, isMatch) {
                if (err) callback(err);

                if (!isMatch) return callback(null, false);

                return callback(null, user);
            });
        });
    }
));

exports.isAuthenticated = passport.authenticate('basic', {session: false});