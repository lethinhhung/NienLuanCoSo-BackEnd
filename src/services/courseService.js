require('dotenv').config();
const Course = require('../models/course');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const createCourseService = async (emoji, color, cover, name, description) => {
    try {
        const term = await Term.findOne({ name });
        if (term) {
            console.log('Duplicate term name');
            return {
                EC: 0,
                EM: 'Duplicate term name',
            };
        }

        // save tag
        let result = await Term.create({
            emoji: emoji,
            color: color,
            cover: cover,
            name: name,
            description: description,
        });
        return { result };
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = {
    createCourseService,
};
