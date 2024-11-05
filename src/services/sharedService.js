require('dotenv').config();
const Term = require('../models/term');
const Course = require('../models/course');
const User = require('../models/user');
const Statistics = require('../models/statistics');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const Test = require('../models/test');

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
            let term = await Term.findById(termId);
            if (term) {
                course.term = termId;
                course.startDate = term.startDate;
                course.endDate = term.endDate;
                await course.save();
            }

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

const getAllTestsInfoService = async (owner) => {
    try {
        const user = await User.findOne({ name: owner });
        if (!user) {
            throw new Error('User not found');
        }
        if (!user.courses) {
            throw new Error("User doesn't have any courses");
        }

        let allTests = [];
        for (const courseId of user.courses) {
            const courseResult = await Course.findById(courseId);
            if (!courseResult) {
                console.log(`Course not found for courseId: ${courseId}`);
                continue;
            }

            const statisticsResult = await Statistics.findById(courseResult.statistics);
            if (!statisticsResult || !statisticsResult.tests) {
                console.log(`Statistics not found or no tests for courseId: ${courseId}`);
                continue;
            }

            for (const test of statisticsResult.tests) {
                let testResult = await Test.findById(test);
                if (testResult) {
                    allTests.push({
                        ...testResult._doc,
                        courseName: courseResult.name,
                        courseId: courseId,
                        statisticsId: courseResult.statistics,
                    });
                } else {
                    console.log(`Test not found for testId: ${test}`);
                }
            }
        }

        return allTests;
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
    getAllTestsInfoService,
};
