const { createTermService, getTermsInfoService, getTermInfoService } = require('../services/termService');
const upload = require('../../middleware/multer');
const jwt = require('jsonwebtoken');

const createTerm = async (req, res) => {
    const { emoji, color, name, description, startDate, endDate } = req.body;
    const cover = req.file;
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const data = await createTermService(owner, emoji, color, cover, name, description, startDate, endDate);
    return res.status(200).json(data);
};

const getTermsInfo = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const data = await getTermsInfoService(owner);
    return res.status(200).json(data);
};

const getTermInfo = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const owner = decoded.name;

    const { termId } = req.body;

    const data = await getTermInfoService(owner, termId);
    return res.status(200).json(data);
};

module.exports = {
    createTerm,
    getTermsInfo,
    getTermInfo,
};
