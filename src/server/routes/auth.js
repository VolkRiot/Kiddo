const express  = require('express'),
      router   = express.Router(),
      passport = require('passport');

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect : '/#/profile', // (TODO): This will eventually be main profile page!
    failureRedirect : '/'
}));

router.get('/google', passport.authenticate('google',
  { scope :
    ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
    session: true,
}));

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;
