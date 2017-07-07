'use strict'

const UserController     = require('./userController'),
      CalendarController = require('./calendarController');

module.exports = {
  user    : UserController,
  calendar: CalendarController
};

