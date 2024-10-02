const express = require('express');
const path = require('path');
const { createUser, handleLogin, getAccountInfo, updateUser } = require('../controllers/userController');
const { createTag, getTagsInfo } = require('../controllers/tagController');
const { createTerm, getTermsInfo } = require('../controllers/termController');
const { createCourse, getCoursesInfo } = require('../controllers/courseController');
const auth = require('../../middleware/auth');
const delay = require('../../middleware/delay');
const upload = require('../../middleware/multer');

const routerAPI = express.Router();

routerAPI.use(express.static(path.join(__dirname, 'public')));

routerAPI.all('*', auth);

routerAPI.get('/', (req, res) => {
    return res.status(200).json('Hello world api');
});

//Auth
routerAPI.post('/register', createUser);
routerAPI.post('/login', handleLogin);

//Account
routerAPI.get('/account', getAccountInfo);
routerAPI.put('/update', upload.single('avatar'), updateUser);

//Tag
routerAPI.post('/create-new-tag', createTag);
routerAPI.get('/get-tags-info', getTagsInfo);

//Term
routerAPI.post('/create-new-term', createTerm);
routerAPI.get('/get-terms-info', getTermsInfo);

//Course
routerAPI.post('/create-new-course', createCourse);
routerAPI.get('/get-courses-info', getCoursesInfo);

//Lesson

module.exports = routerAPI; //export default
