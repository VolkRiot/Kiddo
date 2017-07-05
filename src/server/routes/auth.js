const express  = require('express'),
      router   = express.Router(),
      path     = require('path'),
      passport = require('passport'),
      gcal     = require('google-calendar'),
      jstz     = require('jstz'), //automatically detect timezone and initialize
      timezone = jstz.determine();

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect : '/',
    failureRedirect : '/'
}));

router.get('/google', passport.authenticate('google',
  { scope :
    ['profile', 'email', 'https://www.googleapis.com/auth/calendar']
}));

module.exports = router;
