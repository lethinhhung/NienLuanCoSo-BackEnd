const express = require('express');
const path = require('path');
const { createUser, handleLogin, getAccountInfo, updateUser } = require('../controllers/userController');
const { createTag, getTagsInfo, getTagsInfoByIds } = require('../controllers/tagController');
const { createTerm, getTermsInfo, getTermInfo, deleteTerm } = require('../controllers/termController');
const {
    createCourse,
    getCourseInfo,
    getCoursesInfo,
    getCoursesInfoByIds,
    deleteCourse,
} = require('../controllers/courseController');
const { createLesson, getLessonInfo } = require('../controllers/lessonController');
const auth = require('../../middleware/auth');
const delay = require('../../middleware/delay');
const { uploadAvatar, uploadCover } = require('../../middleware/multer');

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
routerAPI.put('/update', uploadAvatar.single('avatar'), updateUser);

//Tag
routerAPI.post('/create-new-tag', createTag);
routerAPI.get('/get-tags-info', getTagsInfo);
routerAPI.post('/get-tags-info-by-ids', getTagsInfoByIds);

//Term
routerAPI.post('/create-new-term', uploadCover.single('cover'), createTerm);
routerAPI.get('/get-terms-info', getTermsInfo);
routerAPI.post('/get-term-info', getTermInfo);
routerAPI.post('/delete-term', deleteTerm);

//Course
routerAPI.post('/create-new-course', uploadCover.single('cover'), createCourse);
routerAPI.post('/get-course-info', getCourseInfo);
routerAPI.get('/get-courses-info', getCoursesInfo);
routerAPI.post('/get-courses-info-by-ids', getCoursesInfoByIds);
routerAPI.post('/delete-course', deleteCourse);

//Lesson
routerAPI.post('/create-new-lesson', createLesson);
// routerAPI.post('/create-new-course', uploadCover.single('cover'), createCourse);
routerAPI.post('/get-lesson-info', getLessonInfo);
// routerAPI.get('/get-courses-info', getCoursesInfo);
// routerAPI.post('/get-courses-info-by-ids', getCoursesInfoByIds);
// routerAPI.post('/delete-course', deleteCourse);

module.exports = routerAPI; //export default
