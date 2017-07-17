'use strict';
const express   = require('express'),
      router    = express.Router(),
      User      = require('../models/user');

// (TODO): This sux too should be consolidated with the api model Flavio made but it is an issue.
router.get('/everything', (req, res) => {
    User.findById(req.user._id)
      .populate('kids')
        .exec((err, response) => {
          if (err) res.status(500).send('Server failed to return user');
          res.status(200).json(response);
        });
});

module.exports = router;
