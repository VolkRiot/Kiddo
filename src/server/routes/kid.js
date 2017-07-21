'use strict';
const express   = require('express'),
      router    = express.Router(),
      gcal      = require('google-calendar'),
      jstz      = require('jstz'), // Automatically detect timezone and initialize
      timezone  = jstz.determine(),
      Kid       = require('../models/kid'),
      User      = require('../models/user');

// Route to Create Calendar
// eslint-disable-next-line no-unused-vars
var google_calendar = undefined;

router.post('/addcalendar', function(req, res) {
    // Initiate google_calendar with token
    if (!google_calendar) {
        var google_calendar = new gcal.GoogleCalendar(req.user.calAccessToken);
    }
    google_calendar.calendars.insert(
        {
            summary: `${req.body.kiddoData.firstName} ${req.body.kiddoData.lastName} (Child Calendar)`,
            timeZone: timezone.name(),
            description: req.body.kiddoId
        }, function(err, response) {
            if (err){
                throw new Error('Failed attempting to add new Calendar');
            } else {
                Kid.findOneAndUpdate({_id: req.body.kiddoId}, {$set:{calendarId:response.id}}, function(err, response) {
                    if (err) {
                      throw new Error('Failed to update child with new Calendar schema');
                    } else {
                      res.status(200).json(response);
                    }
                });
            }
        }
    );
});

module.exports = router;
