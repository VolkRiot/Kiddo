'use strict'

const mongoose = require('../db/mongodb');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  startDateTime:{
    type: Date,
    required:true
  },
  endDateTime:{
    type: Date,
    required: true
  },
  calendarName:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  createdDateTime: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Events', EventSchema);