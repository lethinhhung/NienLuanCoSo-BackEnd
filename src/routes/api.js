const express = require('express');
const { createUser, handleLogin, getAccount, updateUser } = require('../controllers/userController');
const auth = require('../../middleware/auth');
const delay = require('../../middleware/delay');
const upload = require('../config/multer');

const routerAPI = express.Router();

routerAPI.all('*', auth);

routerAPI.get('/', (req, res) => {
    return res.status(200).json('Hello world api');
});

routerAPI.post('/register', createUser);
routerAPI.post('/login', handleLogin);

routerAPI.get('/account', delay, getAccount);
routerAPI.put('/update', upload.single('avatar'), updateUser);

module.exports = routerAPI; //export default
