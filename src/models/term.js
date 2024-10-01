const mongoose = require('mongoose');

const termSchema = new mongoose.Schema({
    owner: String,
    emoji: String,
    color: String,
    cover: String,
    name: String,
    description: String,
    startDate: Date,
    endDate: Date,
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'course' }],
});

const Term = mongoose.model('term', termSchema);

module.exports = Term;
