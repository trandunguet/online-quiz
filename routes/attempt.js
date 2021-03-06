var express = require('express');
var mongoose = require('mongoose');
var userSchema = require('../models/user.model');
var quizSchema = require('../models/quiz.model');
var router = express.Router();

var User = mongoose.model('User', userSchema);
var Quiz = mongoose.model('Quiz', quizSchema);

/* GET home page. */
router.get('/attempt/:quizId', function (req, res, next) {
    var username = req.session.user;
    if (!username) return res.redirect('/login');
    Quiz.findById(req.params.quizId).populate('questions').exec(function (err, quiz) {
        if (err) return console.log(err);
        res.render('attempt', { user: username, quiz: quiz });
    });
});

module.exports = router;
