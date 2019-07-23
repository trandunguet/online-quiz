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
    console.log('creating new quiz');
    username = req.session.user;
    if (!username) {
        res.redirect('/login');
        return;
    }
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log(err);
            return;
        }
        quiz = new Quiz;
        quiz.name = req.body.quizName;
        quiz.save();
        user.quizzes.push(quiz._id);
        user.save();
    });
    res.redirect('/new-quiz');
});

module.exports = router;
