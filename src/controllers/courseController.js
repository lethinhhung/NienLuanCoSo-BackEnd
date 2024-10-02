const { createCourseService, getCoursesInfoService } = require('../services/courseService');
const upload = require('../../middleware/multer');
const jwt = require('jsonwebtoken');
const Tag = require('../models/tag');

const createCourse = async (req, res) => {
    const { emoji, color, cover, name, description, tags, startDate, endDate, term } = req.body;
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
    // try {
    //     const token = req.headers.authorization.split(' ')[1];

    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     const owner = decoded.name;
    //     // Step 1: Get the array of tag names from the request
    //     const tagNames = req.body.tags;

    //     // Step 2: Find ObjectId of tags from the database
    //     const tags = await Tag.find({ name: { $in: tagNames } }).select('_id');
    //     const tagIds = tags.map((tag) => tag._id);

    //     const { emoji, color, cover, name, description, startDate, endDate, term } = req.body;
    //     // Step 3: Pass the ObjectId array to createCourseService
    //     const courseData = {
    //         owner,
    //         emoji,
    //         color,
    //         cover,
    //         name,
    //         description,
    //         tags,
    //         startDate,
    //         endDate,
    //         term,
    //         tagIds,
    //     };

    //     const newCourse = await createCourseService(courseData);

    //     // Send response
    //     res.status(201).json(newCourse);
    // } catch (error) {
    //     res.status(500).json({ message: error.message });
    // }
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
