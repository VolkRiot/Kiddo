const express = require('express'),
  router = express.Router(),
  UserModel = require('../models/user');

// TODO: Refactror to change this mobile specific designation
/* Multi search API

[base_url]:/mobile/find/:searchParam?term=[SearchTerm]
-- localhost:3000/mobile/find/email?term=metrikin@gmail.com
*/

router.get('/find/user/:by', (req, res) => {
    if (['email', 'name', 'kids', 'events'].indexOf(req.params.by) !== -1) {
      UserModel.find({
        [req.params.by]: req.query.term
      })
      .populate('kids')
      .populate('events')
      .exec((err, response) => {
        if (!err && response.length) {
          res.status(200).json(response[0]);
        } else {
          res.status(500).json(`No user found: ${err}`);
        }
      });
    } else {
      res.status(500).send(`Search for term ${req.params.by} are not permitted`);
    }
});

module.exports = router;
