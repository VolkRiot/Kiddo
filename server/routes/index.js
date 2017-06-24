const express = require('express'),
      router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  response.sendFile(path.resolve(__dirname, '../../public/index.html'))
});

module.exports = router;