'use strict'

const mongoose = require('../db/mongodb');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Kids', UserSchema);