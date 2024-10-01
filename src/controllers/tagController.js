const { createTagService, getTagsInfoService } = require('../services/tagService');
const upload = require('../config/multer');
const jwt = require('jsonwebtoken');

const createTag = async (req, res) => {
    const { name, color } = req.body;

    const data = await createTagService(name, color);
    return res.status(200).json(data);
};

const getTagsInfo = async (req, res) => {
    const data = await getTagsInfoService();
    return res.status(200).json(data);
};

// const updateUser = async (req, res) => {
//     const token = req.headers.authorization.split(' ')[1];

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const { description } = req.body;
//     const name = decoded.name;
//     const avatar = req.file;

//     const data = await updateUserService(name, description, avatar);
//     return res.status(200).json(data);
// };

module.exports = {
    createTag,

    getTagsInfo,
    // updateUser,
};
