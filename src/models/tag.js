const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    owner: String,
    name: String,
    color: String,
});

const Tag = mongoose.model('tag', tagSchema);

module.exports = Tag;
