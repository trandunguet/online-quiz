var express = require('express');
var userApi = require('./user');

var router = express.Router();

router.use(userApi);

module.exports = router;
