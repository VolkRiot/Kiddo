'use strict'

const mongoose = require('../db/mongodb'),
      Schema   = mongoose.Schema;

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

module.exports = mongoose.model('Users', UserSchema);
