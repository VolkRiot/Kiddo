'use strict'

const Crud         = require('./CRUD'),
      EventModel   = require('./../models/event.js');

const EventController = new Crud(EventModel);

// Appending extra property into UserController Obj
EventController.name = 'EventController';

module.exports = EventController;
