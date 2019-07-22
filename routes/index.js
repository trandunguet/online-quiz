var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var text = 'Hello, guest';
    if (req.session.user) {
        text = 'Hello, ' + req.session.user;
    }
    res.render('index', { title: text });
});

module.exports = router;
