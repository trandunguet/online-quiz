// var session = require('express-session');
var mongoose = require('mongoose');
var express = require('express');
var userSchema = require('../../models/user.model');

var router = express.Router();
var User = mongoose.model('User', userSchema);

router.post('/login', function (req, res, next) {
    if (req.session.user) {
        console.log('already logged in');
    }
    User.findOne({username: req.body.username}, (err, user) => {
        if (err) {
            console.log(err);
            return;
        }
        if (user && req.body.password == user.password) {
            req.session.regenerate(function(){
                req.session.user = user.username;
                res.redirect('../../');
            });
        } else {
            res.redirect('../../login?error=denied');
        }
    });
});

router.post('/signup', function (req, res, next) {
    User.create({username: req.body.username, password: req.body.password}, function(err, _)
    {
        if (err)
            res.redirect('../../login?error=username#signup');
        else
            res.redirect('../../login');
    });
});

module.exports = router;
