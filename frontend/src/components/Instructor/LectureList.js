import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LectureList = () => {
  const instructorId = prompt("Enter your instructor ID:");
  const [lectures, setLectures] = useState([]);
  const [filter, setFilter] = useState({ courseName: '', date: '', attendance: '' });

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`http://localhost:5000/api/instructor/lectures/${instructorId}`);
      setLectures(res.data);
    };
    fetch();
  }, [instructorId]);

  const updateAttendance = async (id, status) => {
    await axios.put(`http://localhost:5000/api/instructor/lectures/${id}/attendance`, { attendanceStatus: status });
    setLectures(lectures.map(l => l._id === id ? { ...l, attendanceStatus: status } : l));
  };

  const filtered = lectures.filter(l =>
    l.course.name.toLowerCase().includes(filter.courseName.toLowerCase()) &&
    (!filter.date || l.startTime.startsWith(filter.date)) &&
    (!filter.attendance || l.attendanceStatus === filter.attendance)
  );

  return (
    <div className="table-container">
      <h2>My Lectures</h2>
      <input placeholder="Filter by Course Name" onChange={(e) => setFilter({...filter, courseName: e.target.value})} />
      <input type="date" onChange={(e) => setFilter({...filter, date: e.target.value})} />
      <select onChange={(e) => setFilter({...filter, attendance: e.target.value})}>
        <option value="">All</option>
        <option value="Attended">Attended</option>
        <option value="Not Attended">Not Attended</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Start Time</th>
            <th>Duration (hrs)</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(l => (
            <tr key={l._id}>
              <td>{l.course.name}</td>
              <td>{new Date(l.startTime).toLocaleString()}</td>
              <td>{l.duration}</td>
              <td>{l.attendanceStatus}</td>
              <td>
                <button onClick={() => updateAttendance(l._id, "Attended")}>Attended</button>
                <button onClick={() => updateAttendance(l._id, "Not Attended")}>Not Attended</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LectureList;
