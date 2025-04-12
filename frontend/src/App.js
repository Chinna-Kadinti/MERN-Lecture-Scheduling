import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./components/Admin/Dashboard";
import InstructorList from "./components/Admin/InstructorList";
import AddCourse from "./components/Admin/AddCourse";
import ScheduleLecture from "./components/Admin/ScheduleLecture";
import LectureList from "./components/Instructor/LectureList";

function App() {
  return (
    <div className="app-container">
      <div className="sidebar">
        <h2>EduDash</h2>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/instructors">Instructor List</Link>
          <Link to="/add-course">Courses</Link>
          <Link to="/schedule-lecture">Lectures</Link>
        </nav>
        <nav style={{ paddingLeft: "20px", marginBottom: "20px" }}>
          <Link to="#">Logout</Link>
        </nav>
      </div>

      <div className="main">
        <div className="header">
          <h3>Filters</h3>
          <div>
            <b>Mr. Chinna</b> <br />
            <small>Admin</small>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/instructors" element={<InstructorList />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/schedule-lecture" element={<ScheduleLecture />} />
          <Route path="/lecture-list" element={<LectureList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
