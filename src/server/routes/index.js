const express = require('express'),
      router  = express.Router(),
      path    = require('path');
      passport = require('passport');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../../public'));
});

router.get('/auth/google', passport.authenticate('google', 
  { scope : 
    ['profile', 'email', 'https://www.googleapis.com/auth/calendar'] 
}));

// the callback after google has authenticated the user
router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect : '/',
    failureRedirect : '/'
}));



module.exports = router;