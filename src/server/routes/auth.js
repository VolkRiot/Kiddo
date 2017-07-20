const express              = require('express'),
      router               = express.Router(),
      passport             = require('passport'),
      UserController       = require('./../controllers').user,
    { /*isLoggedIn,*/
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
  UserController.findById({_id: req.user._id}, (err, user) =>{
    if (err) {
      return res.status(500).json(err);
    } else if (!user) {
      return  res.status(204).json({user: null});
    } else {
      return res.status(200).json(user);
    }
  });
});

router.get('/authenticate', isAuthenticated, (req, res) => {
  res.status(200).json({ authenticated: !!req.user });
});

router.get('/filestack/credential', (req, res, next) =>{
  const apikey = process.env.FILESTACK_KEY;
  const signature = process.env.FILESTACK_SIG;
  if (apikey && signature) {
    let Policy = {
      expiry: 1359391107,
      call: 'write',
      handle: apikey
    };

    let response = {
      apikey: apikey,
      signature: signature,
      policy: Policy
    };

    return res.status(200).json(response);
  } else {
    return next({message: 'Fail ', err: 'access denided'});
  }

});
module.exports = router;
