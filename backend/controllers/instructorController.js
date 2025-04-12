const Lecture = require('../models/Lecture');

const getLecturesByInstructor = async (req, res, next) => {
  try {
    const { instructorId } = req.params;
    const lectures = await Lecture.find({ instructor: instructorId }).populate('course');
    res.json(lectures);
  } catch (error) {
    next(error);
  }
};

const updateAttendance = async (req, res, next) => {
  try {
    const { lectureId } = req.params;
    const { attendanceStatus } = req.body;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) return res.status(404).json({ message: 'Lecture not found' });

    lecture.attendanceStatus = attendanceStatus;
    await lecture.save();
    res.json(lecture);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLecturesByInstructor,
  updateAttendance
};