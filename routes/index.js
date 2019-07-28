var express = require('express');
var router = express.Router();
var myQuizzesRouter = require('./my-quizzes');
var newQuizzRouter = require('./new-quiz');
var quizRouter = require('./quiz');

/* GET home page. */
router.get('/', function (req, res, next) {
    var user = req.session.user;
    if (!req.session.user) return res.redirect('/login');

    res.render('index', { user: user });
});

router.use(myQuizzesRouter);
router.use(newQuizzRouter);
router.use(quizRouter);

module.exports = router;
