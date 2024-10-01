const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: String,
    color: String,
});

const Tag = mongoose.model('tag', tagSchema);

module.exports = Tag;
