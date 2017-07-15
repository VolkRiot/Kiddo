'use strict';

const express   = require('express'),
      router    = express.Router(),
      path      = require('path'),
      passport  = require('passport'),
      gcal      = require('google-calendar'),
      jstz      = require('jstz'), // Automatically detect timezone and initialize
      timezone  = jstz.determine(),
      Event     = require('../models/event'),
      User      = require('../models/user');

// Initalize Google Calendar w Token from Passport. Paste Token Here once Copied
var google_calendar = undefined;

// Base Calendar HTML

router.get('/getevents', function(req, res) {
  // Initiate google_calendar with token
  if(!google_calendar) {
    var google_calendar = new gcal.GoogleCalendar(req.user.calAccessToken);
}

  // Array to Hold Events of Multiple Calendars (ie: Children's calendars)
  var calendarListEventArray = [];
  // Retrieve Users's List
  google_calendar.calendarList.list(function(err, calendarList) {

    for (var d = 0; d < calendarList.items.length; d++) {
      var calendarId = calendarList.items[d].id;
      // Retrieve Events from Specific Calendar List
      google_calendar.events.list(
        calendarId,
        { timeMin: new Date().toISOString() },
        function(err, eventList) {
          calendarListEventArray.push(eventList);
          // Send when the length of the array for events of each calendar equals the original amount of calendar Ids gathered from the API response
          if (calendarListEventArray.length == calendarList.items.length) {
            // Send Calendar List Array
            var objectCalendars = {
              eventsForCalendars: calendarListEventArray,
              calendarList: calendarList
            };
            res.json(objectCalendars);
          }
        }
      );
    }
  });
});

// Route to Retrieve Event Data to AddKiddo to Google
router.post('/addevent', function(req,res){

  //Initiate google_calendar with token
  if(!google_calendar) {
    var google_calendar = new gcal.GoogleCalendar(req.user.calAccessToken);
  }
 
  // Insert Event into Google Database
  //API call to retrieve calendarList again to match calendar Name with the specific CalendarId
  google_calendar.calendarList.list(function(err, calendarList) {
    if(err){
      console.log(err);
    } else{
      // Logic to Associate Calendar Name with ID
      for(var i = 0; i < calendarList.items.length; i++){
        if(req.body.calendar === calendarList.items[i].summary){
          var calendarId = calendarList.items[i].id;
          google_calendar.events.insert(calendarId, {
            summary: req.body.title,
            start:{dateTime: req.body.startDate.concat(':00'), timeZone: timezone.name()},
            end:{dateTime: req.body.endDate.concat(':00'), timeZone: timezone.name() }
          },
          function(err,response){
            if(err){
              console.log(err);
            } else{
              console.log("Event Inserted Into Google Database");
              res.send("All Good from Google");
            }
          });
        }
      }
    }
  });

  // Event Inserted into Kiddo Database
  const newEvent = Event();

  newEvent.title = req.body.title;
  newEvent.startDateTime = req.body.startDate.concat(':00');
  newEvent.endDateTime = req.body.endDate.concat(':00');
  newEvent.calendarName = req.body.calendar;
  newEvent.email = req.user.email;
  
  newEvent.save(function(err, data){
    if(err){
      console.log(err);
    } else{
      console.log("Event Inserted into Kiddo DB");
      // Insert Event ID into Users Table for User that Created Event
      User.findOneAndUpdate({email: data.email}, {$push:{events:data._id}}, function(err, response){
        if(err){
          console.log(err);
        } else{
          console.log("User Updated With New Event");
        }
      });
    }
  });
});

module.exports = router;
