var express = require('express');
var mongoose = require('mongoose');
var userSchema = require('../models/user.model');
var quizSchema = require('../models/quiz.model');
var router = express.Router();

var User = mongoose.model('User', userSchema);
var Quiz = mongoose.model('Quiz', quizSchema);

/* GET home page. */
router.get('/', function (req, res, next) {
    var username = req.session.user;
    if (!username) {
        return res.redirect('/login');
    }
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log(err);
            return res.redirect('/');
        }
        var quizzes = [];
        user.quizzes.forEach(quizID => {
            Quiz.findById(quizID, (err, quiz) => {
                quizzes.push(quiz.name);
                if (quizzes.length == user.quizzes.length) {
                    res.render('my-quizzes', { user: user.username, quizzes: quizzes });
                }
            })
        });
    });
});

module.exports = router;
