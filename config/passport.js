const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../models/user');
var bcrypt = require('bcryptjs');

const keys = require('./config');


module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });


  passport.deserializeUser(async function (id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
    try {
      let user = await User.findOne({ "email": email });
      if (!user) {
           return done(null, false, { message: 'No user found!' });
      }
      bcrypt.compare(password, user.password, function (err, isMatch) {
        if (err) console.log(err);
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Wrong password.' });
        }
      });
     } catch (err) {
      console.error("Error during authentication:", err);
      return done(err); // Pass the error to Passport for handling
    }
  }));


}