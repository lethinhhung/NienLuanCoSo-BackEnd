const mongoose = require('mongoose');

// Test Schema
const testSchema = new mongoose.Schema({
    name: String,
    gradeWeight: Number,
    maxScore: Number,
    score: Number,
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
