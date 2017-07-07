'use strict'

<<<<<<< HEAD
//Initalize Google Calendar w Token from Passport. Paste Token Here once Copied
var google_calendar = new gcal.GoogleCalendar('ya29.Glt-BHmwV_ia9F5KTCKPiqJ9jL_OoCG8a8G_84XHCjkP4wtTwSwS7UNP4OV-2CwrItPFDj2PlyjkHmGyjXB2thXIZeZv8J1JSnMIvASMV3psLT2G0cOA9JFbmkqd');
=======
const express  = require('express'),
      path     = require('path'),
      auth     = require('./auth'),
      calndr   = require('./calendar'),
      all      = require('./api');
>>>>>>> origin

// Express router defined
const router = express.Router();

// GET home page.
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../../public'));
});

// Consildated routes from individual files.
router.use('/calendar', calndr);
router.use('/api', all);
router.use('/auth', auth);

module.exports = router;
