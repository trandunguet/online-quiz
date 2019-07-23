var express = require('express');
var userApi = require('./user');
var quizApi = require('./quiz');

var router = express.Router();

router.use(userApi);
router.use(quizApi);

module.exports = router;
