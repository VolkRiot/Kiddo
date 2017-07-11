const express     = require('express'),
      router      = express.Router(),
      passport    = require('passport'),
      isLoggedIn  = require('./helpers/isLoggedInCheck');

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect : '/#/profile',
    failureRedirect : '/'
}));

router.get('/google', passport.authenticate('google',
  { scope :
    ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
    session: true,
}));

router.get('/currentuser', isLoggedIn, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
