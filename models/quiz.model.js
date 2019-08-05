var mongoose = require('mongoose');
var userSchema = require('./user.model');
var User = mongoose.model('User', userSchema);
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var quizSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    questions: [{
        type: ObjectId,
        ref: 'Question'
    }],
    results: [{
        user: String,
        date: Date,
        score: String
    }]
});

quizSchema.pre('remove', function(next) {
    User.update(
        { quizzes : this._id}, 
        { $pull: { quizzes: this._id } })
    .exec();
    next();
});

module.exports = quizSchema;
