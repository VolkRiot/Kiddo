'use strict';

const Crud            = require('./CRUD'),
      CalendarModel   = require('./../models/calendar');

const CalendarController = new Crud(CalendarModel);

// Appending extra property into UserController Obj
CalendarController.name = 'CalendarController';

module.exports = CalendarController;
