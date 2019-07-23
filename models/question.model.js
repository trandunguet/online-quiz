var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

module.exports = questionSchema;
