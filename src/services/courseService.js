require('dotenv').config();
const Course = require('../models/course');
const Term = require('../models/term');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { addCourseService, removeCourseService } = require('./sharedService');

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
        const course = await Course.findOne({ name: name, owner: owner });
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

        const result = await Course.create({
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
        const termId = term;
        const courseId = result._id;

        const kq = await addCourseService(termId, courseId);
        console.log(kq);

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

const getCoursesInfoByIdsService = async (owner, coursesIds) => {
    try {
        let result = await Course.find({ _id: { $in: coursesIds } });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const deleteCourseService = async (owner, courseId) => {
    try {
        // Delete the course
        let result = await Course.findByIdAndDelete(courseId);
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

        if (result.term) {
            const termId = result.term;
            const courseId = result._id;
            const kq = removeCourseService(termId, courseId);
            console.log('Delete ' + kq + ' successfully!');
        }

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
    getCoursesInfoByIdsService,
    deleteCourseService,
};
