require('dotenv').config();
const Term = require('../models/term');
const Course = require('../models/course');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const addCourseService = async (termId, courseId) => {
    try {
        let term = await Term.findById(termId);
        if (term) {
            term.courses.push(courseId);
            await term.save();
            return term;
        } else {
            console.log('ko tim thay term');
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

const removeCourseService = async (termId, courseId) => {
    try {
        let term = await Term.findById(termId);
        if (term) {
            const courseIndex = term.courses.indexOf(courseId);
            if (courseIndex > -1) {
                term.courses.splice(courseIndex, 1);
                await term.save();
                return term;
            } else {
                console.log('Course not found in term');
                return null;
            }
        } else {
            console.log('Term not found');
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

const removeTermService = async (courseId, startDate, endDate) => {
    try {
        let course = await Course.findById(courseId);

        course.term = null;
        course.startDate = new Date(startDate);
        course.endDate = new Date(endDate);
        const result = await course.save();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const addLessonService = async (lessonId, courseId) => {
    try {
        let course = await Course.findById(courseId);
        if (course) {
            course.lessons.push(lessonId);
            await course.save();
            return course;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

const addTermService = async (courseId, termId) => {
    try {
        let course = await Course.findById(courseId);
        if (course) {
            course.term = termId;
            await course.save();
            return course;
        } else {
            console.log('ko tim thay course');
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

module.exports = {
    addCourseService,
    removeCourseService,
    removeTermService,
    addLessonService,
    addTermService,
};
