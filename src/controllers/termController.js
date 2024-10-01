const { createTermService, getTermsInfoService } = require('../services/termService');
const upload = require('../config/multer');
const jwt = require('jsonwebtoken');

const createTerm = async (req, res) => {
    const { emoji, color, cover, name, description, startDate, endDate } = req.body;
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

module.exports = {
    createTerm,
    getTermsInfo,
};
