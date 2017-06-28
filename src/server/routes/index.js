const express = require('express'),
      router  = express.Router(),
      path    = require('path');
<<<<<<< HEAD

=======
      passport = require('passport');
      google   = require('googleapis');
      CalendarList = require('../calendar/calendar.js')
>>>>>>> Working on google calendar list api
/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../../public'));
});


router.get('calendars', function(req,res){
  CalendarList.listCalendars();
});

module.exports = router;