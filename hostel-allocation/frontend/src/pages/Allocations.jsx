import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Allocations() {
  const [allocations, setAllocations] = useState([]);
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
const [form, setForm] = useState({ student_id:'1', room_id:'1' });
  const [msg, setMsg] = useState('');

  const fetchAll = () => {
    axios.get('http://localhost:5000/api/allocations').then(res => setAllocations(res.data));
    axios.get('http://localhost:5000/api/students').then(res => setStudents(res.data));
    axios.get('http://localhost:5000/api/rooms').then(res => setRooms(res.data));
  };

  useEffect(() => { fetchAll(); }, []);

 const handleAllocate = async () => {
  if (!form.student_id || !form.room_id) {
    setMsg('Please select both student and room!');
    return;
  }
  try {
    await axios.post('http://localhost:5000/api/allocations', form);
    setMsg('Room allocated successfully!');
    setForm({ student_id:'', room_id:'' });
    fetchAll();
  } catch(err) {
    setMsg('Error: ' + err.response?.data?.message || 'Something went wrong');
  }
};

  return (
    <div className="page">
      <h2>Allocations</h2>
      <div className="card">
        <h3 style={{marginBottom:'1rem'}}>Allocate Room</h3>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
          <select value={form.student_id}
            onChange={e => setForm({...form, student_id:e.target.value})}>
            <option value="">Select Student</option>
            {students.map(s => (
              <option key={s.student_id} value={s.student_id}>{s.name}</option>
            ))}
          </select>
          <select value={form.room_id}
            onChange={e => setForm({...form, room_id:e.target.value})}>
            <option value="">Select Room</option>
            {rooms.filter(r => r.availability_status === 'Available').map(r => (
              <option key={r.room_id} value={r.room_id}>
                Room {r.room_id} - Floor {r.floor} - ₹{r.price}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleAllocate}>Allocate Room</button>
        {msg && <p className="success">{msg}</p>}
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Student</th><th>Room</th><th>Floor</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {allocations.length === 0 ? (
            <tr><td colSpan="5" style={{textAlign:'center', color:'#666'}}>No allocations yet</td></tr>
          ) : (
            allocations.map(a => (
              <tr key={a.allocation_id}>
                <td>{a.allocation_id}</td>
                <td>{a.name}</td>
                <td>Room {a.room_id}</td>
                <td>Floor {a.floor}</td>
                <td><span className="badge badge-green">{a.status}</span></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}