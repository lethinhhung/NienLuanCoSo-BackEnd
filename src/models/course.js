const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    emoji: String,
    color: String,
    cover: String,
    name: String,
    description: String,
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tag' }],
    startDate: Date,
    endDate: Date,
    term: { type: mongoose.Schema.Types.ObjectId, ref: 'term' },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'lesson' }],
});

const Course = mongoose.model('course', courseSchema);

module.exports = Course;
