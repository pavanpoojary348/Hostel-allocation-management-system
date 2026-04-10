import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [counts, setCounts] = useState({ students: 0, rooms: 0, allocations: 0 });

  useEffect(() => {
    axios.get('http://localhost:5000/api/students').then(res =>
      setCounts(c => ({ ...c, students: res.data.length })));
    axios.get('http://localhost:5000/api/rooms').then(res =>
      setCounts(c => ({ ...c, rooms: res.data.length })));
    axios.get('http://localhost:5000/api/allocations').then(res =>
      setCounts(c => ({ ...c, allocations: res.data.length })));
  }, []);

  return (
    <div className="page">
      <h2>Dashboard</h2>
      <div className="stats">
        <div className="stat-card">
          <h3>{counts.students}</h3>
          <p>Total Students</p>
        </div>
        <div className="stat-card">
          <h3>{counts.rooms}</h3>
          <p>Total Rooms</p>
        </div>
        <div className="stat-card">
          <h3>{counts.allocations}</h3>
          <p>Allocations Done</p>
        </div>
      </div>
      <div className="card">
        <h3 style={{marginBottom:'1rem'}}>Welcome, Admin 👋</h3>
        <p style={{color:'#666', lineHeight:'1.8'}}>
          This is the Hostel Room Allocation Management System.<br/>
          Use the navigation above to manage students, rooms and allocations.
        </p>
      </div>
    </div>
  );
}