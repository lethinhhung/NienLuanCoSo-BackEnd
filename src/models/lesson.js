const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    name: String,
    description: String,
    content: String,
});

const Lesson = mongoose.model('lesson', lessonSchema);

module.exports = Lesson;
