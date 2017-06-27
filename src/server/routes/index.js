const express = require('express'),
      router  = express.Router(),
      path    = require('path');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../../public'));
});

module.exports = router;