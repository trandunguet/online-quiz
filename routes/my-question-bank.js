var express = require('express');
var mongoose = require('mongoose');
var userSchema = require('../models/user.model');
var quizSchema = require('../models/quiz.model');
var router = express.Router();

var User = mongoose.model('User', userSchema);

router.get('/my-question-bank', function (req, res, next) {
    var username = req.session.user;
    if (!username) return res.redirect('/login');
    
    User.findOne({ username: username }).populate('questions').exec(function (err, user) {
        if (err) {
            console.log(err);
            return res.redirect('/');
        }
        res.render('my-question-bank', { user: user.username, questions: user.questions });
    });
});

module.exports = router;
