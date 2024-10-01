const { createTermService } = require('../services/termService');
const upload = require('../config/multer');
const jwt = require('jsonwebtoken');

const createTerm = async (req, res) => {
    const { emoji, color, cover, name, description } = req.body;

    const data = await createTermService(emoji, color, cover, name, description);
    return res.status(200).json(data);
};

module.exports = {
    createTerm,
};
