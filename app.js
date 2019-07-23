var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var session = require('express-session');

var indexRouter = require('./routes/index');
var newQuizRouter = require('./routes/new-quiz');
var myQuizRouter = require('./routes/my-quizzes');
var apiRouter = require('./routes/api');

var app = express();

if (process.env.NODE_ENV === 'development') {
    app.set('db_url', 'mongodb://localhost:27017/online-quiz');
}

if (process.env.NODE_ENV === 'production') {
    app.set('db_url', 'mongodb://admin:qwerty123456@ds249127.mlab.com:49127/heroku_5dl6q79h');
}

console.log(process.env.NODE_ENV);

mongoose.connect(app.get('db_url'), { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err) {
        console.log(err);
    }
});

app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'shhhh, very secret'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/new-quiz', newQuizRouter);
app.use('/my-quizzes', myQuizRouter);
app.use(apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
