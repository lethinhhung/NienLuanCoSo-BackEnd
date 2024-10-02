const { createCourseService, getCoursesInfoService } = require('../services/courseService');
const { uploadAvatar } = require('../../middleware/multer');
const jwt = require('jsonwebtoken');
const Tag = require('../models/tag');

const createCourse = async (req, res) => {
    const { emoji, color, name, description, startDate, endDate, term } = req.body;
    const cover = req.file;
    const tags = [];
    req.body.tags.forEach((tag) => {
        tags.push(tag);
    });
    console.log(tags);
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const tagsResult = await Tag.find({ name: { $in: tags } }).select('_id');
    const tagIds = tagsResult.map((tag) => tag._id);

    const data = await createCourseService(
        owner,
        emoji,
        color,
        cover,
        name,
        description,
        tagIds,
        startDate,
        endDate,
        term,
    );
    return res.status(200).json(data);
};

const getCourseInfo = async (req, res) => {};

const getCoursesInfo = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const data = await getCoursesInfoService(owner);
    return res.status(200).json(data);
};

module.exports = {
    createCourse,
    getCourseInfo,
    getCoursesInfo,
};
