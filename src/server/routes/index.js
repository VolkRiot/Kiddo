const express = require('express'),
      router  = express.Router(),
      path    = require('path');
      passport = require('passport');
      google   = require('googleapis');
      CalendarList = require('../calendar/calendar.js');
/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../../public'));
});


router.get('/calendars', function(req,res){
  console.log(CalendarList);
});

//route to signin for google and set scopes
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