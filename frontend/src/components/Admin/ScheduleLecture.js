import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ScheduleLecture = () => {
  const [form, setForm] = useState({ course: '', instructor: '', startTime: '', duration: 1 });
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const courseData = await axios.get('http://localhost:5000/api/admin/courses');
      const instructorData = await axios.get('http://localhost:5000/api/admin/instructors');
      setCourses(courseData.data);
      setInstructors(instructorData.data);
    };
    fetchData();
  }, []);

  const schedule = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/admin/lectures', form);
      alert('Lecture scheduled!');
      setForm({ course: '', instructor: '', startTime: '', duration: 1 });
    } catch (err) {
      alert(err.response?.data?.message || 'Error scheduling lecture');
    }
  };

  return (
    <div className="table-container">
      <h2>Schedule Lecture</h2>
      <form onSubmit={schedule}>
        <select value={form.course} onChange={(e) => setForm({...form, course: e.target.value})} required>
          <option value="">Select Course</option>
          {courses.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <select value={form.instructor} onChange={(e) => setForm({...form, instructor: e.target.value})} required>
          <option value="">Select Instructor</option>
          {instructors.map((i) => <option key={i._id} value={i._id}>{i.name}</option>)}
        </select>
        <input type="datetime-local" value={form.startTime} onChange={(e) => setForm({...form, startTime: e.target.value})} required />
        <input type="number" min="1" value={form.duration} onChange={(e) => setForm({...form, duration: e.target.value})} required />
        <button type="submit">Schedule</button>
      </form>
    </div>
  );
};

export default ScheduleLecture;
