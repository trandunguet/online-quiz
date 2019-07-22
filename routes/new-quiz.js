var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log('new quiz');
    var user = req.session.user;
    if (!req.session.user) {
        res.redirect('/login');
    }
    res.render('new-quiz', { user: user });
});

module.exports = router;
