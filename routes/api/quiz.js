// var session = require('express-session');
var mongoose = require('mongoose');
var express = require('express');
var userSchema = require('../../models/user.model');
var quizSchema = require('../../models/quiz.model');
var questionSchema = require('../../models/question.model');

var router = express.Router();
var User = mongoose.model('User', userSchema);
var Quiz = mongoose.model('Quiz', quizSchema);
var Question = mongoose.model('Question', questionSchema);

router.post('/new-quiz', function (req, res, next) {
    username = req.session.user;
    if (!username) return res.redirect('/login');

    User.findOne({ username: username }, function (err, user) {
        if (err) return console.log(err);
        quiz = new Quiz({
            name: req.body.quizName
        });
        quiz.save(function (err) {
            if (err) return console.log(err);
            user.quizzes.push(quiz._id);
            user.save();
            res.redirect('/quiz/' + quiz._id);
        });
    });
});

router.post('/new-question', function(req, res, next) {
    username = req.session.user;
    if (!username) return res.redirect('/login');

    User.findOne({ username: username }, function (err, user) {
        question = new Question({
            stem: req.body.stem,
            key: req.body.key
        });
        question.save(function (err) {
            if (err) return console.log(err);
            user.questions.push(question._id);
            user.save();
            res.redirect('#');
        })
    })
});

module.exports = router;
