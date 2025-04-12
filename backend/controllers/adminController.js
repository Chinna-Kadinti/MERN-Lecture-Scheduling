const Instructor = require('../models/Instructor');
const Course = require('../models/Course');
const Lecture = require('../models/Lecture');

const getInstructors = async (req, res, next) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (error) {
    next(error);
  }
};

const addInstructor = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const instructor = await Instructor.create({ name, email });
    res.status(201).json(instructor);
  } catch (error) {
    next(error);
  }
};

const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    next(error);
  }
};

const addCourse = async (req, res, next) => {
  try {
    const { name, level, description, image, date } = req.body;
    const course = await Course.create({ name, level, description, image, date });
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
};

const getLectures = async (req, res, next) => {
  try {
    const lectures = await Lecture.find().populate('course').populate('instructor');
    res.json(lectures);
  } catch (error) {
    next(error);
  }
};

const scheduleLecture = async (req, res, next) => {
  try {
    const { course, instructor, startTime, duration } = req.body;
    const start = new Date(startTime);
    const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

    const conflict = await Lecture.findOne({
      instructor,
      startTime: { $lt: end },
      $expr: {
        $gt: [
          { $add: ['$startTime', { $multiply: ['$duration', 3600000] }] },
          start
        ]
      }
    });

    if (conflict) {
      return res.status(400).json({ message: 'Instructor already has a lecture during this time.' });
    }

    const newLecture = await Lecture.create({ course, instructor, startTime, duration });
    res.status(201).json(newLecture);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getInstructors,
  addInstructor,
  getCourses,
  addCourse,
  getLectures,
  scheduleLecture
};