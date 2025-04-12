const express = require('express');
const router = express.Router();
const {
  getLecturesByInstructor,
  updateAttendance
} = require('../controllers/instructorController');

router.get('/lectures/:instructorId', getLecturesByInstructor);
router.put('/lectures/:lectureId/attendance', updateAttendance);

module.exports = router;