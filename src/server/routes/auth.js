const express              = require('express'),
      router               = express.Router(),
      passport             = require('passport'),
    { isLoggedIn,
      isUser,
      isAuthenticated }    = require('./helpers/isLoggedInCheck');

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect : '/#/dashboard',
    failureRedirect : '/'
}));

router.get('/google', passport.authenticate('google',
  { scope :
    ['profile', 'email', 'https://www.googleapis.com/auth/calendar'],
    session: true,
}));

router.get('/currentuser', isUser, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/authenticate', isAuthenticated, (req, res) => {
  res.status(200).json({ authenticated: !!req.user })
});

module.exports = router;
