import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/students').then(res => setStudents(res.data));
  }, []);

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    (s.usn && s.usn.toLowerCase().includes(search.toLowerCase())) ||
    (s.department && s.department.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="page">
      <h2>Students</h2>
      <input
        placeholder="🔍 Search by name, USN or department..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{marginBottom:'1rem'}}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>USN</th><th>Gender</th><th>Year</th><th>Department</th><th>Budget</th><th>Priority Score</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length === 0 ? (
            <tr><td colSpan="8" style={{textAlign:'center', color:'#666'}}>No students found</td></tr>
          ) : (
            filteredStudents.map(s => (
              <tr key={s.student_id}>
                <td>{s.student_id}</td>
                <td>{s.name}</td>
                <td>{s.usn || '-'}</td>
                <td>{s.gender}</td>
                <td>{s.year}</td>
                <td>{s.department}</td>
                <td>₹{s.budget}</td>
                <td>{s.priority_score}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}