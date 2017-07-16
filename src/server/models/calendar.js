'use strict';

const mongoose = require('../db/mongodb'),
      Schema   = mongoose.Schema;

const CalendarSchema = new Schema({
  calendar: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Calendar', CalendarSchema);
