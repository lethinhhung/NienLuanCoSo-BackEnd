const {
    createUserService,
    loginService,
    updateUserService,
    getAccountInfoService,
} = require('../services/userService');
const upload = require('../config/multer');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    const { name, email, password, description } = req.body;

    const data = await createUserService(name, email, password, description);
    return res.status(200).json(data);
};

const handleLogin = async (req, res) => {
    const { name, password } = req.body;
    const data = await loginService(name, password);

    return res.status(200).json(data);
};

const getAccountInfo = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const name = decoded.name;
    const data = await getAccountInfoService(name);
    return res.status(200).json(data);
};

const updateUser = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { description } = req.body;
    const name = decoded.name;
    const avatar = req.file;

    const data = await updateUserService(name, description, avatar);
    return res.status(200).json(data);
};

module.exports = {
    createUser,
    handleLogin,
    getAccountInfo,
    updateUser,
};
