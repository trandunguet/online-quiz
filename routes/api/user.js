// var session = require('express-session');
var mongoose = require('mongoose');
var express = require('express');
var userSchema = require('../../models/user.model');

var router = express.Router();
var User = mongoose.model('User', userSchema);

router.post('/login', function (req, res, next) {
    res.send(req.body.name + ',,, ' + req.body.password);
});

router.post('/signup', function (req, res, next) {
    User.create({username: req.body.name, password: req.body.password}, function(err, _)
    {
        console.log(err);
    });
    res.redirect('../../signup-login');
});

module.exports = router;
