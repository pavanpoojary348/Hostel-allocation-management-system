import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Allocations() {
  const [allocations, setAllocations] = useState([]);
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({ student_id:'1', room_id:'1' });
  const [msg, setMsg] = useState('');
  const [search, setSearch] = useState('');

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
      setForm({ student_id:'1', room_id:'1' });
      fetchAll();
    } catch(err) {
      setMsg('Error: ' + err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleAutoAllocate = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/allocations/auto-allocate');
      setMsg(res.data.message);
      fetchAll();
    } catch(err) {
      setMsg('Error: ' + err.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Cancel this allocation?')) return;
    await axios.delete(`http://localhost:5000/api/allocations/${id}`);
    setMsg('Allocation cancelled!');
    fetchAll();
  };

  const filteredStudents = students.filter(s =>
    search === '' ||
    (s.usn && s.usn.toLowerCase().includes(search.toLowerCase())) ||
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <h2>Allocations</h2>
      <div className="card">
        <h3 style={{marginBottom:'1rem'}}>Allocate Room</h3>
        <input
          placeholder="Search student by USN or name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{marginBottom:'1rem'}}
        />
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
          <select value={form.student_id}
            onChange={e => setForm({...form, student_id:e.target.value})}>
            <option value="">Select Student</option>
            {filteredStudents.map(s => (
              <option key={s.student_id} value={s.student_id}>
                {s.name} {s.usn ? `- ${s.usn}` : ''}
              </option>
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
        <div style={{display:'flex', gap:'1rem', marginTop:'0.5rem'}}>
          <button onClick={handleAllocate}>Allocate Room</button>
          <button onClick={handleAutoAllocate} style={{background:'#1a1a2e'}}>
            ⚡ Auto Allocate All
          </button>
        </div>
        {msg && <p className="success">{msg}</p>}
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Student</th><th>USN</th><th>Room</th><th>Floor</th><th>Price</th><th>Date</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allocations.length === 0 ? (
            <tr><td colSpan="9" style={{textAlign:'center', color:'#666'}}>No allocations yet</td></tr>
          ) : (
            allocations.map(a => (
              <tr key={a.allocation_id}>
                <td>{a.allocation_id}</td>
                <td>{a.name}</td>
                <td>{a.usn || '-'}</td>
                <td>Room {a.room_id}</td>
                <td>Floor {a.floor}</td>
                <td>₹{a.price}</td>
                <td>{new Date(a.allocation_date).toLocaleDateString()}</td>
                <td><span className="badge badge-green">{a.status}</span></td>
                <td>
                  <button onClick={() => handleDelete(a.allocation_id)}
                    style={{background:'#e74c3c', padding:'4px 12px', fontSize:'12px'}}>
                    Cancel
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}