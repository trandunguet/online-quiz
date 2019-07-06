var express = require('express');
var router = express.Router();

router.post('/login', function(req, res, next) {
  res.send(req.body.name + ',,, ' + req.body.password);
});

router.post('/signup', function(req, res, next) {
    res.send(req.body.name + ',,, ' + req.body.password);
});

module.exports = router;
