'use strict'

const express  = require('express'),
      path     = require('path'),
      auth     = require('./auth'),
      calndr   = require('./calendar'),
      user     = require('./api');

// Express router defined
const router = express.Router();

// GET home page.
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../../public'));
});

// Consildated routes from individual files.
router.use('/auth', auth);
router.use('/calendar', calndr);
router.use('/user', user);

module.exports = router;
