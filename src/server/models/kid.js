'use strict'

const mongoose = require('../db/mongodb'),
      Schema   = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  created_by:[
    {
      type: Schema.Types.ObjectId,
      ref: 'Users'
    }
  ],
  timestamp: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Kids', UserSchema);