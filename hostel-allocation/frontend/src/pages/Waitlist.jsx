import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Waitlist() {
  const [waitlist, setWaitlist] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [msg, setMsg] = useState('');

  const fetchAll = () => {
    axios.get('http://localhost:5000/api/waitlist').then(res => setWaitlist(res.data));
    axios.get('http://localhost:5000/api/rooms').then(res => setRooms(res.data));
  };

  useEffect(() => { fetchAll(); }, []);

  const handleAllocate = async (waitlist_id, room_id) => {
    if (!room_id) { setMsg('Please select a room!'); return; }
    try {
      await axios.put(`http://localhost:5000/api/waitlist/allocate/${waitlist_id}`, { room_id });
      setMsg('Student allocated from waitlist!');
      fetchAll();
    } catch(err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  const availableRooms = rooms.filter(r => r.availability_status === 'Available');

  return (
    <div className="page">
      <h2>Waitlist</h2>
      {msg && <p className="success" style={{marginBottom:'1rem'}}>{msg}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Student</th><th>USN</th><th>Branch</th><th>Sem</th><th>Budget</th><th>Requested</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {waitlist.length === 0 ? (
            <tr><td colSpan="9" style={{textAlign:'center', color:'#666'}}>No students in waitlist</td></tr>
          ) : (
            waitlist.map(w => (
              <tr key={w.waitlist_id}>
                <td>{w.waitlist_id}</td>
                <td>{w.name}</td>
                <td>{w.usn || '-'}</td>
                <td>{w.branch}</td>
                <td>{w.semester}</td>
                <td>₹{w.budget}</td>
                <td>{new Date(w.requested_at).toLocaleDateString()}</td>
                <td>
                  <span className={w.status === 'Waiting' ? 'badge badge-red' : 'badge badge-green'}>
                    {w.status}
                  </span>
                </td>
                <td>
                  {w.status === 'Waiting' && (
                    <select style={{width:'150px'}} onChange={e => handleAllocate(w.waitlist_id, e.target.value)}>
                      <option value="">Assign Room</option>
                      {availableRooms.map(r => (
                        <option key={r.room_id} value={r.room_id}>
                          Room {r.room_id} - ₹{r.price}
                        </option>
                      ))}
                    </select>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}