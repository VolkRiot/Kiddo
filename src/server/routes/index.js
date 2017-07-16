'use strict';

const express  = require('express'),
      path     = require('path'),
      auth     = require('./auth'),
      calndr   = require('./calendar'),
      kid      = require('./kid'),
      all      = require('./api'),
      mobile   = require('./mobileHelpers'),
      user     = require('./user');

// Express router defined
const router = express.Router();

// GET home page.
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../public'));
});

// Consildated routes from individual files.
router.use('/calendar', calndr);
router.use('/api', all);
router.use('/auth', auth);
router.use('/kid', kid);
router.use('/mobile', mobile);
router.use('/user', user);

module.exports = router;
