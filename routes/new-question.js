var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/new-question', function (req, res, next) {
    var user = req.session.user;
    if (!req.session.user) {
        return res.redirect('/login');
    }
    res.render('new-question', { user: user });
});

module.exports = router;
