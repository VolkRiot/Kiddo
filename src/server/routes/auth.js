const express  = require('express'),
      router   = express.Router(),
      passport = require('passport');

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect : '/calendar',
    failureRedirect : '/'
}));

router.get('/google', passport.authenticate('google',
  { scope :
    ['profile', 'email', 'https://www.googleapis.com/auth/calendar']
}));

module.exports = router;
