import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name:'', gender:'Male', year:1, department:'', budget:'' });
  const [msg, setMsg] = useState('');

  const fetchStudents = () => {
    axios.get('http://localhost:5000/api/students').then(res => setStudents(res.data));
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleSubmit = async () => {
    await axios.post('http://localhost:5000/api/students', form);
    setMsg('Student registered successfully!');
    setForm({ name:'', gender:'Male', year:1, department:'', budget:'' });
    fetchStudents();
  };

  return (
    <div className="page">
      <h2>Students</h2>
      <div className="card">
        <h3 style={{marginBottom:'1rem'}}>Register New Student</h3>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
          <input placeholder="Full Name" value={form.name}
            onChange={e => setForm({...form, name:e.target.value})} />
          <select value={form.gender}
            onChange={e => setForm({...form, gender:e.target.value})}>
            <option>Male</option>
            <option>Female</option>
          </select>
          <input placeholder="Year" type="number" value={form.year}
            onChange={e => setForm({...form, year:e.target.value})} />
          <input placeholder="Department" value={form.department}
            onChange={e => setForm({...form, department:e.target.value})} />
          <input placeholder="Budget" type="number" value={form.budget}
            onChange={e => setForm({...form, budget:e.target.value})} />
        </div>
        <button onClick={handleSubmit}>Register Student</button>
        {msg && <p className="success">{msg}</p>}
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Gender</th><th>Year</th><th>Department</th><th>Budget</th><th>Priority Score</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.student_id}>
              <td>{s.student_id}</td>
              <td>{s.name}</td>
              <td>{s.gender}</td>
              <td>{s.year}</td>
              <td>{s.department}</td>
              <td>₹{s.budget}</td>
              <td>{s.priority_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}