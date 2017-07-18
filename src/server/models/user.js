'use strict';

const mongoose   = require('../db/mongodb'),
      Schema     = mongoose.Schema,
      KidModel   = require('./../models/kid'),
      EventModel = require('./../models/event');

const UserSchema = new Schema({
  googleId: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    reuired: true
  },
  calAccessToken: {
    type: String
  },
  kids:[
    {
      type: Schema.Types.ObjectId,
      ref: 'Kids'
    }
  ],
  events:[
    {
      type: Schema.Types.ObjectId,
      ref: 'Events'
    }
  ],
  timestamp: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('remove', function(next) {

  KidModel.remove({_id: {$in: this.kids}}).exec( err => {
    if (err) {
      let err = new Error('Fail on Delete Kids');
      next(err);
    } else {
      next();
    }
  });

  EventModel.remove({_id: {$in: this.events}}).exec( err => {
    if (err) {
      let err = new Error('Fail on Delete Kids');
      next(err);
    } else {
      next();
    }
  });

});

module.exports = mongoose.model('Users', UserSchema);
