'use strict';

const express    = require('express'),
      router     = express.Router(),
      gcal       = require('google-calendar'),
      jstz       = require('jstz'), // Automatically detect timezone and initialize
      timezone   = jstz.determine(),
      Event      = require('../models/event'),
      User       = require('../models/user'),
      Kid        = require('../models/kid'),
      Calendar   = require('../models/calendar'),
      jsdom      = require('jsdom'),
      { JSDOM }  = jsdom,
      { window } = new JSDOM(),
      $          = require('jquery')(window);

// Initalize Google Calendar w Token from Passport. Paste Token Here once Copied
// eslint-disable-next-line no-unused-vars
var google_calendar = undefined;

// Base Calendar HTML

router.get('/getevents', function(req) {
  calendarSnapshot(req);
});

router.get('/geteventsnapshot', function(req,res){
  Calendar.findOne({googleId: req.user.googleId}, function(err,calendar){
    if (err){
      throw new Error(err);
    } else {
      res.json(calendar);
    }
  });
});

// Route to Retrieve Event Data to AddKiddo to Google
router.post('/addevent', function(req){
  
  // Initiate google_calendar with token
  if (!google_calendar) {
    var google_calendar = new gcal.GoogleCalendar(req.user.calAccessToken);
  }
  // Insert Event into Google Database
  // API call to retrieve calendarList again to match calendar Name with the specific CalendarId
  google_calendar.calendarList.list(function(err, calendarList){
    calendarSnapshot(req);
    if (err) {
      throw new Error(err);
    } else {
      // Logic to Associate Calendar Name with ID
      for (var i = 0; i < calendarList.items.length; i++){
        if (req.body.calendar === calendarList.items[i].summary){
          var calendarId = calendarList.items[i].id;
          google_calendar.events.insert(calendarId, {
            summary: req.body.title,
            start:{dateTime: req.body.startDate.concat(':00'), timeZone: timezone.name()},
            end:{dateTime: req.body.endDate.concat(':00'), timeZone: timezone.name() }
          },
          function(err) {
            if (err) {
              throw new Error(err);
            
            } else {
              
              
              const newEvent = Event();

              newEvent.title = req.body.title;
              newEvent.startDateTime = req.body.startDate.concat(':00');
              newEvent.endDateTime = req.body.endDate.concat(':00');
              newEvent.calendarName = req.body.calendar;
              newEvent.email = req.user.email;

              newEvent.save(function(err, data){
                if (err) {
                  throw new Error(err);
                  
                } else {
                  // Insert Event ID into Users Table for User that Created Event

                  User.findOneAndUpdate({email: data.email}, {$push:{events:data._id}}, function(err){
                    if (err) {
                      throw new Error(err);
                      
                    } else {
                      // Successfully updated user with new info

                      Kid.findOneAndUpdate({calendarId: calendarId}, {$push:{events:data._id}}, function(err){
                        if (err){
                          throw new Error(err);
                        
                        }  else {
                          // Successfully updated kid with event
                         
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      }
    }
  });
});

function calendarSnapshot(req){
  var finalCalendarArray = [];
  // Initiate google_calendar with token
  if (!google_calendar) {
    var google_calendar = new gcal.GoogleCalendar(req.user.calAccessToken);
}

  // Array to Hold Events of Multiple Calendars (ie: Children's calendars)
  var calendarListEventArray = [];
   var colorArray = ['#ffaa28','#f7786b','#c178ba','#ffdd32','#56d8b1'];
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
            //res.json(objectCalendars);
            var calendarTitleArray = [];
            $.each(objectCalendars.calendarList.items, function(i,val){
                calendarTitleArray.push(val.summary);
            });

            $.each(objectCalendars.eventsForCalendars, function(i,calendar){
              var eventArray = [];
              // Breakdown each event
              $.each(calendar.items, function(i,event){
                // All Day Events vs Specific DateTime events filtering
                var startDate;
                var endDate;
                if (event.start.date == null || event.end.date == null){
                  startDate = event.start.dateTime;
                  endDate = event.end.dateTime;
                } else {
                  startDate = event.start.date;
                  endDate = event.end.date;
                }
                var eventObject = {
                  title: event.summary,
                  start: startDate,
                  end: endDate
                };
                eventArray.push(eventObject);
                return eventArray;
              });
              var eventsObject = {
                events: eventArray,
                color: colorArray[i]
              };
              finalCalendarArray.push(eventsObject);
              if (finalCalendarArray.length === objectCalendars.eventsForCalendars.length){
                var finalCalendarListObject = {
                  objectCalendars: calendarTitleArray
                };
                var finalCalendarEventsObject = {
                  objectEvents: finalCalendarArray
                };
                Calendar.findOne({googleId: req.user.googleId}, function(err,calendar){
                  if (err){
                    throw new Error(err);
                  }
                  if (calendar){
                    Calendar.findOneAndUpdate({googleId: req.user.googleId}, {$set:{calendarListObject: JSON.stringify(finalCalendarListObject), calendarEventObject: JSON.stringify(finalCalendarEventsObject)  }}, function(err){
                      if (err){
                        throw new Error(err);
                      }
                    });
                  } else {
                    const newCalendar = new Calendar();

                    newCalendar.email = req.user.email;
                    newCalendar.googleId = req.user.googleId;
                    newCalendar.calendarListObject = JSON.stringify(finalCalendarListObject);
                    newCalendar.calendarEventObject = JSON.stringify(finalCalendarEventsObject);

                    newCalendar.save(function(err){
                      if (err){
                        throw new Error(err);
                      }
                    });
                  }
                });  
              }
            });
          }
        }
      );
    }
  });
}

module.exports = router;
