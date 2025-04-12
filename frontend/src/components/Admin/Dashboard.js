import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [counts, setCounts] = useState({ instructors: 0, courses: 0, lectures: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const instructors = await axios.get('http://localhost:5000/api/admin/instructors');
      const courses = await axios.get('http://localhost:5000/api/admin/courses');
      const lectures = await axios.get('http://localhost:5000/api/admin/lectures');
      setCounts({
        instructors: instructors.data.length,
        courses: courses.data.length,
        lectures: lectures.data.length
      });
    };
    fetchData();
  }, []);

  return (
    <div className="table-container">
      <h2>Dashboard Overview</h2>
      <p><b>Total Instructors:</b> {counts.instructors}</p>
      <p><b>Total Courses:</b> {counts.courses}</p>
      <p><b>Total Lectures:</b> {counts.lectures}</p>
    </div>
  );
};

export default Dashboard;
