var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    quizzes: {
        type: [ObjectId],
        required: true
    },
    questions: {
        type: [ObjectId],
        required: true
    }
});

module.exports = userSchema;
