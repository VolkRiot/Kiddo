'use strict'

const UserController     = require('./userController'),
      CalendarController = require('./calendarController'),
      EventController    = require('./eventController');

module.exports = {
  user    : UserController,
  calendar: CalendarController,
  event   : EventController
};

