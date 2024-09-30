const { createUserService, loginService, updateUserService } = require('../services/userService');
const upload = require('../config/multer');

const createUser = async (req, res) => {
    const { name, email, password, discription } = req.body;

    const data = await createUserService(name, email, password, discription);
    return res.status(200).json(data);
};

const handleLogin = async (req, res) => {
    const { name, password } = req.body;
    const data = await loginService(name, password);

    return res.status(200).json(data);
};

const getAccount = async (req, res) => {
    return res.status(200).json(req.user);
};

const updateUser = async (req, res) => {
    const { name, discription } = req.body;
    const avatar = req.file;

    const data = await updateUserService(name, discription, avatar);
    return res.status(200).json(data);
};

module.exports = {
    createUser,
    handleLogin,
    getAccount,
    updateUser,
};
