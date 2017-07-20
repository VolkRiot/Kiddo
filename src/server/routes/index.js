'use strict';

const express     = require('express'),
      path        = require('path'),
      auth        = require('./auth'),
      calndr      = require('./calendar'),
      kid         = require('./kid'),
      all         = require('./api'),
      mobile      = require('./mobileHelpers'),
      indexRender = require('./helpers/indexRender');

// Express router defined
const router = express.Router();

// GET home page.
router.get('/', (req, res) => {
  res.status(200).send(indexRender());
});

// Consildated routes from individual files.
router.use('/calendar', calndr);
router.use('/api', all);
router.use('/auth', auth);
router.use('/kid', kid);
router.use('/mobile', mobile);

module.exports = router;
