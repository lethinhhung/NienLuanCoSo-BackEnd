require('dotenv').config();
const Lesson = require('../models/lesson');
const Course = require('../models/course');
const Term = require('../models/term');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { addLessonService } = require('./sharedService');

const createLessonService = async (owner, name, description, content, course) => {
    try {
        // save course

        const result = await Lesson.create({
            owner: owner,
            name: name,
            description: description,
            content: content,
            course: course,
        });
        const courseId = course;
        const lessonId = result._id;

        const kq = await addLessonService(lessonId, courseId);
        console.log(kq);
        return { result };
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getLessonsInfoService = async (owner, courseId) => {
    try {
        let result = await Lesson.find({ course: courseId });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getLessonInfoService = async (owner, lessonId) => {
    try {
        let result = await Lesson.findById(lessonId);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const getLessonsInfoByIdsService = async (owner, lessonsIds) => {
    try {
        let result = await Lesson.find({ _id: { $in: lessonsIds } });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const deleteLessonService = async (owner, lessonId) => {
    try {
        let result = await Lesson.findByIdAndDelete(lessonId);

        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = {
    createLessonService,
    getLessonsInfoService,
    getLessonInfoService,
    getLessonsInfoByIdsService,
    deleteLessonService,
};
