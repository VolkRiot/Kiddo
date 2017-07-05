'use strict';

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

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
        accessType: 'offline'
      },
      (accessToken, refreshToken, profile, cb) => {
        // Send Access Token and Profile Information to Database
        console.log('Access Token: ' + accessToken);
        cb(null, null);
      }
    )
  );
  // used to serialize the user for the session
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  // used to deserialize the user
  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });
};
