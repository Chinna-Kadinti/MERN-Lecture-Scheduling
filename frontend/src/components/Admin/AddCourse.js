import React, { useState } from 'react';
import axios from 'axios';

const AddCourse = () => {
  const [form, setForm] = useState({ name: '', level: '', description: '', image: '', date: '' });

  const addCourse = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/admin/courses', form);
    setForm({ name: '', level: '', description: '', image: '', date: '' });
    alert('Course added successfully!');
  };

  return (
    <div className="table-container">
      <h2>Add Course</h2>
      <form onSubmit={addCourse}>
        <input placeholder="Course Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
        <input placeholder="Level" value={form.level} onChange={(e) => setForm({...form, level: e.target.value})} required />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} />
        <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({...form, image: e.target.value})} />
        <input type="date" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} required />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
