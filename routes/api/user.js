var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/login', function(req, res, next) {
  res.send(req.body.name + ', ' + req.body.password);
});

module.exports = router;
