const mongoose = require('mongoose');

const statisticsSchema = new mongoose.Schema({
    owner: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'course' },
    tests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'test' }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'project' }],
});

const Statistics = mongoose.model('statistics', statisticsSchema);

module.exports = Statistics;
