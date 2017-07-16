'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user');

// Configure the Google strategy for use by Passport.js.
//
// OAuth 2-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Google API on the user's behalf,
// along with the user's profile. The function must invoke `cb` with a user
// object, which will be set at `req.user` in route handlers after
// authentication.

module.exports = function() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACKURL,
      },
      (accessToken, refreshToken, profile, done) => {
        // Send Access Token and Dashboard Information to Database

        process.nextTick(() => {
          User.findOne({ googleId: profile.id }, (err, user) => {
            if (err) {
              return done(err);
            }
            if (user) {
              // Update Access Token for existing User
              User.findOneAndUpdate({ googleId: profile.id }, {$set: { calAccessToken: accessToken }}, { new: true }, (err, updatedUser) => {
                if (err) {
                  return done(err);
                } else {
                  return done(null, updatedUser);
                }
              });
            } else {
              // New User Creation
              const newUser = new User();

              // Build new User
              newUser.googleId = profile.id;
              newUser.email = profile.emails[0].value;
              newUser.calAccessToken = accessToken;

              newUser.save(err => {
                if (err) {
                  return done(err);
                }
                return done(null, newUser);
              });
            }
          });
        });
      }
    )
  );

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  // used to deserialize the user
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
