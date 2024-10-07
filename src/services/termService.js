require('dotenv').config();
const Term = require('../models/term');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const createTermService = async (owner, emoji, color, cover, name, description, startDate, endDate) => {
    try {
        const term = await Term.findOne({ name });
        if (term) {
            console.log('Duplicate course name');
            return {
                EC: 0,
                EM: 'Duplicate course name',
            };
        }
        let coverPath = '';
        if (cover) {
            coverPath = cover.path;
        }

        // save course
        let result = await Term.create({
            owner: owner,
            emoji: emoji,
            color: color,
            cover: coverPath,
            name: name,
            description: description,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
        });
        return { result };
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getTermsInfoService = async (owner) => {
    try {
        let result = await Term.find({ owner: owner });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getTermInfoService = async (owner, termId) => {
    try {
        let result = await Term.findById(termId);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const addCourseService = async (termId, courseId) => {
    try {
        let term = await Term.findById(termId);
        if (term) {
            term.courses.push(courseId);
            await term.save();
            return term;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

const deleteTermService = async (owner, termId) => {
    try {
        let result = await Term.findByIdAndDelete(termId);
        if (result.cover) {
            const coverPath = path.join(result.cover);

            // Delete the old avatar file
            fs.unlink(coverPath, (err) => {
                if (err) {
                    console.error(`Failed to delete cover: ${err.message}`);
                } else {
                    console.log('Cover deleted successfully');
                }
            });
        }

        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = {
    createTermService,
    getTermsInfoService,
    getTermInfoService,
    addCourseService,
    deleteTermService,
};
