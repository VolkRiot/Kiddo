'use strict';

const mongoose    = require('./../db/mongodb'),
      Schema      = mongoose.Schema,
      EventModel  = require('./../models/event');

const KidSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  userName:{
    type: String,
    required: true
  },
  user_id:{
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  avatar:{
    type: Object,
  },
  password:{
    type: String,
    required: true
  },
  calendarId:{
    type: String
  },
  notes: [String],
  shopping: [String],
  reminders: [String],
  events:[
    {
      type: Schema.Types.ObjectId,
      ref: 'Events'
    }
  ],
  coords:{
    type: Object,
    lat: Number,
    lng: Number
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
});

KidSchema.pre('remove', function(next) {

  EventModel.remove({_id: {$in: this.events}}).exec(err => {
    if (err) {
      let err = new Error('Fail on Delete Kids');
      next(err);
    } else {
      next();
    }
  });

});

module.exports = mongoose.model('Kids', KidSchema);
