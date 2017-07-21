'use strict';

const mongoose = require('../db/mongodb'),
      Schema   = mongoose.Schema;

const CalendarSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  googleId: {
    type: String,
    required: true
  },
  calendarListObject:{
    type: String,
    required: true
  },
  calendarEventObject: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Calendar', CalendarSchema);
