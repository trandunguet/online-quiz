var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var questionSchema = require('../models/question.model');
var Question = mongoose.model('Question', questionSchema);

/* GET home page. */
router.get('/edit-question/:questionId', function (req, res, next) {
    var user = req.session.user;
    if (!req.session.user) return res.redirect('/login');

    Question.findById(req.params.questionId, function(err, question) {
        res.render('edit-question', { user: user, question: question });
    })
});

module.exports = router;
