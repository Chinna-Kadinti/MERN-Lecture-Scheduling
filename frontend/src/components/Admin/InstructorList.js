import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InstructorList = () => {
  const [instructors, setInstructors] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  const fetchInstructors = async () => {
    const res = await axios.get('http://localhost:5000/api/admin/instructors');
    setInstructors(res.data);
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  const addInstructor = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/admin/instructors', form);
    setForm({ name: '', email: '', phone: '' });
    fetchInstructors();
  };

  return (
    <div className="table-container">
      <h2>Instructor List</h2>
      <table>
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Instructor Name</th>
            <th>Phone Number</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {instructors.map((inst, idx) => (
            <tr key={inst._id}>
              <td>{idx + 1}</td>
              <td>{inst.name}</td>
              <td>{inst.phone || '(000) 000-0000'}</td>
              <td>{inst.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={addInstructor}>
        <input placeholder="Instructor Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} required />
        <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} />
        <button type="submit">Add Instructor</button>
      </form>
    </div>
  );
};

export default InstructorList;
