// var session = require('express-session');
var mongoose = require('mongoose');
var express = require('express');
var userSchema = require('../../models/user.model');

var router = express.Router();
var User = mongoose.model('User', userSchema);

router.post('/login', function (req, res, next) {
    User.findOne({ username: req.body.username }, function (err, user) {
        if (err) return console.log(err);
        if (user && req.body.password == user.password) {
            req.session.regenerate(function () {
                req.session.user = user.username;
                return res.redirect('/');
            });
        }
        else return res.redirect('/login?error=denied');
    });
});

router.post('/signup', function (req, res, next) {
    User.create({ username: req.body.username, password: req.body.password }, function (err, _) {
        if (err) return res.redirect('/login?error=username#signup');
        else return res.redirect('/login');
    });
});

router.get('/logout', function (req, res, next) {
    if (req.session) {
        req.session.destroy(function (err) {
            if (err) return next(err);
            else return res.redirect('/');
        });
    }
});

module.exports = router;
