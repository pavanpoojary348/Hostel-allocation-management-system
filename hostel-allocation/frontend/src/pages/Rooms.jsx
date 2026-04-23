import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [filters, setFilters] = useState({ ac_type:'', floor:'', status:'', washroom:'' });
  const [form, setForm] = useState({
    floor:1, capacity:2, price:'', block_id:1,
    room_type:'Double', ac_type:'Non-AC', washroom:'Outside'
  });
  const [msg, setMsg] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchRooms = () => {
    axios.get('http://localhost:5000/api/rooms').then(res => setRooms(res.data));
  };

  useEffect(() => { fetchRooms(); }, []);

  const handleAddRoom = async () => {
    try {
      await axios.post('http://localhost:5000/api/rooms', form);
      setMsg('Room added successfully!');
      setShowForm(false);
      fetchRooms();
    } catch(err) {
      setMsg(err.response?.data?.message || 'Error adding room');
    }
  };

  const filtered = rooms.filter(r => {
    if (filters.ac_type && r.ac_type !== filters.ac_type) return false;
    if (filters.floor && r.floor !== parseInt(filters.floor)) return false;
    if (filters.status && r.availability_status !== filters.status) return false;
    if (filters.washroom && r.washroom !== filters.washroom) return false;
    return true;
  });

  return (
    <div className="page">
      <h2>Rooms</h2>

      <div className="card" style={{marginBottom:'1.5rem'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem'}}>
          <h3>🔍 Filter Rooms</h3>
          <button onClick={() => setShowForm(!showForm)}
            style={{background:'#1a1a2e', padding:'6px 16px', fontSize:'13px'}}>
            {showForm ? '✕ Cancel' : '+ Add Room'}
          </button>
        </div>

        {showForm && (
          <div style={{borderTop:'1px solid #eee', paddingTop:'1rem', marginBottom:'1rem'}}>
            <h3 style={{marginBottom:'1rem'}}>Add New Room</h3>
            <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1rem'}}>
              <div>
                <label style={{fontSize:'12px', color:'#666'}}>Floor</label>
                <select value={form.floor} onChange={e => setForm({...form, floor:e.target.value})}>
                  <option value={1}>Floor 1</option>
                  <option value={2}>Floor 2</option>
                  <option value={3}>Floor 3</option>
                </select>
              </div>
              <div>
                <label style={{fontSize:'12px', color:'#666'}}>Capacity</label>
                <select value={form.capacity} onChange={e => setForm({...form, capacity:e.target.value})}>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </div>
              <div>
                <label style={{fontSize:'12px', color:'#666'}}>Price (₹)</label>
                <input placeholder="e.g. 5000" type="number" value={form.price}
                  onChange={e => setForm({...form, price:e.target.value})} />
              </div>
              <div>
                <label style={{fontSize:'12px', color:'#666'}}>Block</label>
                <select value={form.block_id} onChange={e => setForm({...form, block_id:e.target.value})}>
                  <option value={1}>Block A (Male)</option>
                  <option value={2}>Block B (Female)</option>
                </select>
              </div>
              <div>
                <label style={{fontSize:'12px', color:'#666'}}>Room Type</label>
                <select value={form.room_type} onChange={e => setForm({...form, room_type:e.target.value})}>
                  <option>Single</option>
                  <option>Double</option>
                  <option>Triple</option>
                </select>
              </div>
              <div>
                <label style={{fontSize:'12px', color:'#666'}}>AC Type</label>
                <select value={form.ac_type} onChange={e => setForm({...form, ac_type:e.target.value})}>
                  <option>AC</option>
                  <option>Non-AC</option>
                </select>
              </div>
              <div>
                <label style={{fontSize:'12px', color:'#666'}}>Washroom</label>
                <select value={form.washroom} onChange={e => setForm({...form, washroom:e.target.value})}>
                  <option>Attached</option>
                  <option>Outside</option>
                </select>
              </div>
            </div>
            <button style={{marginTop:'1rem'}} onClick={handleAddRoom}>Add Room</button>
            {msg && <p className="success" style={{marginTop:'0.5rem'}}>{msg}</p>}
          </div>
        )}

        <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem'}}>
          <select value={filters.ac_type}
            onChange={e => setFilters({...filters, ac_type:e.target.value})}>
            <option value="">All AC Types</option>
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
          </select>
          <select value={filters.floor}
            onChange={e => setFilters({...filters, floor:e.target.value})}>
            <option value="">All Floors</option>
            <option value="1">Floor 1</option>
            <option value="2">Floor 2</option>
            <option value="3">Floor 3</option>
          </select>
          <select value={filters.status}
            onChange={e => setFilters({...filters, status:e.target.value})}>
            <option value="">All Status</option>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
          </select>
          <select value={filters.washroom}
            onChange={e => setFilters({...filters, washroom:e.target.value})}>
            <option value="">All Washrooms</option>
            <option value="Attached">Attached</option>
            <option value="Outside">Outside</option>
          </select>
        </div>
        <button style={{marginTop:'1rem', background:'#666'}}
          onClick={() => setFilters({ac_type:'', floor:'', status:'', washroom:''})}>
          Clear Filters
        </button>
        <span style={{marginLeft:'1rem', color:'#666', fontSize:'13px'}}>
          Showing {filtered.length} of {rooms.length} rooms
        </span>
      </div>

      <table>
        <thead>
          <tr>
            <th>Room ID</th><th>Floor</th><th>Type</th><th>AC/Non-AC</th>
            <th>Washroom</th><th>Capacity</th><th>Price</th><th>Status</th><th>Block</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr><td colSpan="9" style={{textAlign:'center', color:'#666'}}>No rooms found</td></tr>
          ) : (
            filtered.map(r => (
              <tr key={r.room_id}>
                <td>{r.room_id}</td>
                <td>Floor {r.floor}</td>
                <td>{r.room_type}</td>
                <td>{r.ac_type}</td>
                <td>{r.washroom}</td>
                <td>{r.capacity}</td>
                <td>₹{r.price}</td>
                <td>
                  <span className={r.availability_status === 'Available' ? 'badge badge-green' : 'badge badge-red'}>
                    {r.availability_status}
                  </span>
                </td>
                <td>Block {r.block_id === 1 ? 'A' : 'B'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}