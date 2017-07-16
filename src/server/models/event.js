'use strict'

const mongoose  = require('../db/mongodb'),
      Schema    = mongoose.Schema;

const EventSchema = new Schema({
  kid_id:{
    type: Schema.Types.ObjectId,
    ref: 'Kids',
    required: false
  },
  user_id:{
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: false
  },
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
