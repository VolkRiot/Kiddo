'use strict'

const UserController     = require('./userController'),
      CalendarController = require('./calendarController'),
      KidController    = require('./kidsController'),
      EventController    = require('./eventController');

module.exports = {
  user    : UserController,
  calendar: CalendarController,
  event   : EventController,
  kid     : KidController
};

