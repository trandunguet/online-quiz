var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var text = 'Hello, guess';
    if (req.session.user) {
        text = 'Hello, ' + req.session.user;
    }
    res.render('index', { title: text });
});

module.exports = router;
