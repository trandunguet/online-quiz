var express = require('express');
var userApi = require('./user');

var router = express.Router();

router.use('/user', userApi);

module.exports = router;
