const {
    addCourseService,
    addTermService,
    removeCourseService,
    removeTermService,
} = require('../services/sharedService');
const { uploadAvatar } = require('../../middleware/multer');
const jwt = require('jsonwebtoken');
const Tag = require('../models/tag');
const Term = require('../models/term');
const moment = require('moment');

const addCourseToTerm = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const { termId, courseId } = req.body;

    await addTermService(courseId, termId);
    const data = await addCourseService(termId, courseId);
    return res.status(200).json(data);
};

const removeCourseFromTerm = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const { termId, courseId } = req.body;

    const result = await removeCourseService(termId, courseId);
    const startDate = moment(result.startDate).format('yyyy-MM-DD');
    const endDate = moment(result.endDate).format('yyyy-MM-DD');
    const data = await removeTermService(courseId, startDate, endDate);
    return res.status(200).json({
        EC: 0,
        data: data,
    });
};

module.exports = {
    addCourseToTerm,
    removeCourseFromTerm,
};
