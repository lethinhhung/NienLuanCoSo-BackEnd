require('dotenv').config();
const Course = require('../models/course');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const createCourseService = async (
    owner,
    emoji,
    color,
    cover,
    name,
    description,
    tagsIds,
    startDate,
    endDate,
    term,
) => {
    try {
        const course = await Course.findOne({ name });
        if (course) {
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
        let result = await Course.create({
            owner: owner,
            emoji: emoji,
            color: color,
            cover: coverPath,
            name: name,
            description: description,
            tags: tagsIds,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            term: term,
        });
        return { result };
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getCoursesInfoService = async (owner) => {
    try {
        let result = await Course.find({ owner: owner });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getCourseInfoService = async (owner, courseId) => {
    try {
        let result = await Course.findById(courseId);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = {
    createCourseService,
    getCoursesInfoService,
    getCourseInfoService,
};
