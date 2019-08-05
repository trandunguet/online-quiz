var express = require('express');
var mongoose = require('mongoose');
var userSchema = require('../models/user.model');
var quizSchema = require('../models/quiz.model');
var router = express.Router();

var User = mongoose.model('User', userSchema);
var Quiz = mongoose.model('Quiz', quizSchema);

router.get('/quiz/:quizId/add-from-bank', function (req, res, next) {
    var username = req.session.user;
    if (!username) return res.redirect('/login');
    
    User.findOne({ username: username }).populate('questions').exec(function (err, user) {
        Quiz.findById(req.params.quizId, function(err, quiz) {
            res.render('add-from-bank', { user: user.username, questions: user.questions, quiz: quiz });
        })
    });
});

module.exports = router;
