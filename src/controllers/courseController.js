const { createCourseService, getCoursesInfoService } = require('../services/courseService');
const upload = require('../config/multer');
const jwt = require('jsonwebtoken');

const createCourse = async (req, res) => {
    const { emoji, color, cover, name, description, tags, startDate, endDate, term } = req.body;
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;
    const data = await createCourseService(
        owner,
        emoji,
        color,
        cover,
        name,
        description,
        tags,
        startDate,
        endDate,
        term,
    );
    return res.status(200).json(data);
};

const getCoursesInfo = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const data = await getCoursesInfoService(owner);
    return res.status(200).json(data);
};

module.exports = {
    createCourse,
    getCoursesInfo,
};
