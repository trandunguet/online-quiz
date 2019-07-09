// var session = require('express-session');
var mongoose = require('mongoose');
var express = require('express');
var userSchema = require('../../models/user.model');

var router = express.Router();
var User = mongoose.model('User', userSchema);

router.post('/login', function (req, res, next) {
    User.findOne({username: req.body.username}, (err, user) => {
        if (err) {
            console.log(err);
            return;
        }
        if (user && req.body.password == user.password) {
            console.log('found one');
        } else {
            console.log('not found');
        }
    });
    res.redirect('../../signup-login');
});

router.post('/signup', function (req, res, next) {
    User.create({username: req.body.username, password: req.body.password}, function(err, _)
    {
        console.log(err);
    });
    res.redirect('../../signup-login');
});

module.exports = router;
