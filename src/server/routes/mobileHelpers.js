const express   = require('express'),
      router    = express.Router(),
      UserModel = require('../models/user');

// TODO: Refactror to change this mobile specific designation
/* Multi search API

[base_url]:/mobile/find/:searchParam?term=[SearchTerm]
-- localhost:3000/mobile/find/email?term=metrikin@gmail.com
*/

router.get('/find/:by', (req, res) => {
  console.log("Param recorded as ", req.params.by)
  console.log("Req query param ", req.query.term)
  UserModel.find({[req.params.by]: req.query.term})
    .then((response, err) => {
      if(!err) {
        console.log("Response is", response)
      }
    })
})

module.exports = router;
