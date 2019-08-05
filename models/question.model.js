var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = require('./user.model');
var User = mongoose.model('User', userSchema);
var quizSchema = require('./quiz.model');
var Quiz = mongoose.model('Quiz', quizSchema);

var questionSchema = new Schema({
    stem: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    }
});

questionSchema.pre('remove', function(next) {
    User.update(
        { questions : this._id }, 
        { $pull: { questions: this._id } })
    .exec();

    Quiz.update(
        { questions : this._id }, 
        { $pull: { questions: this._id } },
        { multi : true })
    .exec();
    Quiz.update()
    next();
});

module.exports = questionSchema;
