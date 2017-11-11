'use strict';

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var sortAnswer = function(a, b) {
    console.log("a la: " + a.text)
    console.log("b la: " + b.text)
    if (a.votes === b.votes) {
        if (a.updatedAt > b.updatedAt) {
            return -1;
        } else if (a.updatedAt < b.updatedAt) {
            return 1;
        } else {
            return 0;
        }
    }
    return b.votes - a.votes;
}

var AnswerSchema = new Schema({
    text: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    votes: {type: Number, default: 0}
});

AnswerSchema.method("update", function(updates, callback) {
    Object.assign(this, updates, {updatedAt: new Date()});
    this.parent().save(callback);
});

AnswerSchema.method("vote", function(vote, callback) {
    if (vote === "up") {
        this.votes +=1;
    } else {
        this.votes -= 1;
    }
    this.parent().save(callback);
});

var QuestionSchema = new Schema({
    text: String,
    createdAt: {type: Date, default: Date.now },
    answers: [AnswerSchema]
});

QuestionSchema.pre("save", function(next) {
    this.answers.sort(sortAnswer);
    next();
});

var Question = mongoose.model("Question", QuestionSchema);

module.exports.Question = Question;