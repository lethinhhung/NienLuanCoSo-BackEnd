const express = require('express');
const path = require('path');
const { createUser, handleLogin, getAccountInfo, updateUser } = require('../controllers/userController');
const auth = require('../../middleware/auth');
const delay = require('../../middleware/delay');
const upload = require('../config/multer');

const routerAPI = express.Router();

routerAPI.use(express.static(path.join(__dirname, 'public')));

routerAPI.all('*', auth);

routerAPI.get('/', (req, res) => {
    return res.status(200).json('Hello world api');
});

routerAPI.post('/register', createUser);
routerAPI.post('/login', handleLogin);

routerAPI.get('/account', getAccountInfo);
routerAPI.put('/update', upload.single('avatar'), updateUser);

module.exports = routerAPI; //export default
