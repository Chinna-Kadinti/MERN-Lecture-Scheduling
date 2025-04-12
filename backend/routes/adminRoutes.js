const express = require('express');
const router = express.Router();
const {
  getInstructors, addInstructor,
  getCourses, addCourse,
  scheduleLecture, getLectures
} = require('../controllers/adminController');

router.get('/instructors', getInstructors);
router.post('/instructors', addInstructor);
router.get('/courses', getCourses);
router.post('/courses', addCourse);
router.post('/lectures', scheduleLecture);
router.get('/lectures', getLectures);

module.exports = router;