'use strict'
const express   = require('express'),
      router    = express.Router(),
      gcal      = require('google-calendar'),
      jstz      = require('jstz'), // Automatically detect timezone and initialize
      timezone  = jstz.determine(),
      Kid       = require('../models/kid');  

var google_calendar = undefined;

// Route to Create Calendar

router.post('/addcalendar', function(req, res) {

    // Initiate google_calendar with token
    if(!google_calendar) {
        var google_calendar = new gcal.GoogleCalendar(req.user.calAccessToken);
    }

    google_calendar.calendars.insert(
        { 
            summary: req.body.firstName + " " + req.body.lastName + " (Child Calendar)",
            timeZone: timezone.name()
        }, function(err, response) {
            if(err){
                console.log(err);
            } else{
                Kid.findOneAndUpdate({userName: req.body.userName}, {$set:{calendarId:response.id}}, function(err, response){
                    console.log("New Kid Calendar Created");
                });
            }
        }
    );
});

module.exports = router;
