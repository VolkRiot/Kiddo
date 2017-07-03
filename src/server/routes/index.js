const express = require('express'),
      router  = express.Router(),
      path    = require('path');
      passport = require('passport');
      gcal    = require('google-calendar');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../../public'));
});

//Calendar GetEvents
router.get('/calendar/getevents', function(req,res){
  //Array to Hold Events of Multiple Calendars (ie: Children's calendars)
  var calendarListEventArray = [];
  //Initalize Google Calendar w Token from Passport. Paste Token Here once Copied
  var google_calendar = new gcal.GoogleCalendar('ya29.GmB7BCq43oW_gbx7Fg-rHmm2jOZ6P-C7_6uw5Md96gmUwCed7SQmd7TpWuEB-uF-9W2UvDvbDRs3udArT74X2ar0qMh12NQ5s9JcX-gDRJJzK3gnwg1BcAureWMKoNy9x74');
  
  //Retrieve Users's List
  google_calendar.calendarList.list(function(err, calendarList) {
    for(var d = 0; d < calendarList.items.length; d++){
      var calendarId = calendarList.items[d].id;
      //Retrieve Events from Specific Calendar List
      google_calendar.events.list(calendarId, {'timeMin': new Date().toISOString()}, function(err, eventList){
        calendarListEventArray.push(eventList);
        //Send when the length of the array for events of each calendar equals the original amount of calendar Ids gathered from the API response
        if(calendarListEventArray.length == calendarList.items.length){
          res.send(calendarListEventArray);
        } 
      });
    }
  });
});

//Calendar HTML
router.get('/calendar', function(req,res){
  res.sendFile(path.join(__dirname, '../../../public/calendar.html'));
});

//Route to Retrieve Event Data to Add to Google
router.post('/addevent', function(req,res){
  console.log(req.body);
  res.send('event received');
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