const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    discription: String,
    avatar: {
        data: Buffer,
        contentType: String,
    },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
