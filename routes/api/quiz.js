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

            if (req.body.quizId) {
                Quiz.findById(req.body.quizId, function(err, quiz) {
                    quiz.questions.push(question._id);
                    quiz.save();
                    res.redirect('/quiz/' + req.body.quizId);
                })
            }
            else res.redirect('/my-question-bank');
        })
    })
});

router.post('/attempt/:quizId', function(req, res, next) {
    username = req.session.user;
    if (!username) return res.redirect('/login');

    Quiz.findById(req.params.quizId).populate('questions').exec(function(err, quiz) {
        var score = 0;
        quiz.questions.forEach(question => {
            if (question.key == req.body[question._id]) {
                score += 1;
            }
        });
        quiz.results.push({ user: username, date: new Date(), score: score + ' / ' + quiz.questions.length })
        quiz.save();
        res.redirect('/quiz/' + quiz._id + '/results');
    })
})

router.get('/quiz/:quizId/delete', function(req, res, next) {
    username = req.session.user;
    if (!username) return res.redirect('/login');

    Quiz.findById(req.params.quizId, function(err, quiz) {
        quiz.remove();
        res.redirect('/my-quizzes');
    });
})

router.get('/quiz/:quizId/delete-question/:index', function(req, res, next) {
    username = req.session.user;
    if (!username) return res.redirect('/login');

    Quiz.findById(req.params.quizId, function(err, quiz) {
        quiz.questions.splice(req.params.index, 1);
        quiz.save();
        res.redirect('/quiz/' + req.params.quizId);
    });
})

router.post('/edit-question/:questionId', function(req, res, next) {
    username = req.session.user;
    if (!username) return res.redirect('/login');

    Question.findById(req.params.questionId, function(err, question) {
        question.stem = req.body.stem;
        question.key = req.body.key;
        question.save();
        res.redirect('/my-question-bank');
    })
})

router.get('/quiz/:quizId/add-from-bank/:questionId', function(req, res, next) {
    username = req.session.user;
    if (!username) return res.redirect('/login');

    Quiz.findById(req.params.quizId, function(err, quiz) {
        quiz.questions.push(req.params.questionId);
        quiz.save();
        res.redirect('/quiz/' + quiz._id);
    })
})

router.get('/question/:questionId/delete', function(req, res, next) {
    username = req.session.user;
    if (!username) return res.redirect('/login');

    Question.findById(req.params.questionId, function(err, question) {
        question.remove();
        res.redirect('/my-question-bank');
    })
})

module.exports = router;
