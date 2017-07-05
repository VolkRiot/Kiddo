'use strict'

const express  = require('express'),
      router   = express.Router(),
      auth     = require('./auth'),
      calndr   = require('./calendar'),
      path     = require('path');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../../public'));
});

// Consildated routes from individual files.
router.use('/auth', auth);
router.use('/calendar', calndr);

module.exports = router;
