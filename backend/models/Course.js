const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  date: { type: Date, required: true }
});
module.exports = mongoose.model('Course', courseSchema);