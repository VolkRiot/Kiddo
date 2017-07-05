'use strict'

const express  = require('express'),
      router   = express.Router(),
      path     = require('path'),
      passport = require('passport'),
      gcal     = require('google-calendar'),
      //automatically detect timezone and initialize
      jstz     = require('jstz'),
      timezone = jstz.determine();

//Initalize Google Calendar w Token from Passport. Paste Token Here once Copied
var google_calendar = new gcal.GoogleCalendar('ya29.Glx9BEvRYnu1ZbmaVOWVPEqNpJ7rgzzrtjBbV4KpjB7dt56N_oKv33-Sht-Un1JR1Vg-9Jo9SHSMgKjeqmAy2i4VnKsQTYnvhNKg-9VEV-oVlCAdN1SXbu9BEXYqpw');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../../public'));
});

//Calendar GetEvents
router.get('/calendar/getevents', function(req,res){
  //Array to Hold Events of Multiple Calendars (ie: Children's calendars)
  var calendarListEventArray = [];
  //Retrieve Users's List
  google_calendar.calendarList.list(function(err, calendarList) {
    for(var d = 0; d < calendarList.items.length; d++){
      var calendarId = calendarList.items[d].id;
      //Retrieve Events from Specific Calendar List
      google_calendar.events.list(calendarId, {'timeMin': new Date().toISOString()}, function(err, eventList){
        calendarListEventArray.push(eventList);
        //Send when the length of the array for events of each calendar equals the original amount of calendar Ids gathered from the API response
        if(calendarListEventArray.length == calendarList.items.length){
          //Send Calendar List Array
          var objectCalendars = {
            eventsForCalendars: calendarListEventArray,
            calendarList: calendarList
          }
          res.json(objectCalendars);
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
  //Parse JSON
  var eventJSON = JSON.parse(req.body.eventInfo);
  console.log(eventJSON.calendar);
  //Logic to Associate Calendar Summary with ID
  google_calendar.calendarList.list(function(err, calendarList) {
    for(var i = 0; i < calendarList.items.length; i++){
      if(eventJSON.calendar === calendarList.items[i].summary){
        console.log(calendarList.items[i].id);
        var calendarId = calendarList.items[i].id;
        google_calendar.events.insert(calendarId, {summary: eventJSON.title, start:{dateTime: eventJSON.startDate.concat(':00'), timeZone: timezone.name()}, end:{dateTime: eventJSON.endDate.concat(':00'), timeZone: timezone.name() }}, function(err,response){
          if(err){
            console.log(err);
          }
          console.log("Event Inserted");
        });
      }
    }
  });
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
