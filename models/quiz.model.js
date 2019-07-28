var mongoose = require('mongoose');
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
    }]
});

module.exports = quizSchema;
