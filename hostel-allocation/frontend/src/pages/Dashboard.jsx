import { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#185FA5', '#0F6E56', '#854F0B', '#534AB7', '#A32D2D', '#BA7517', '#0C447C'];

export default function Dashboard() {
  const [counts, setCounts] = useState({ students: 0, rooms: 0, allocations: 0 });
  const [branchData, setBranchData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/students').then(res => {
      setCounts(c => ({ ...c, students: res.data.length }));
      const branchCount = {};
      res.data.forEach(s => {
        const b = s.branch || s.department || 'Unknown';
        branchCount[b] = (branchCount[b] || 0) + 1;
      });
      setBranchData(Object.entries(branchCount).map(([name, value]) => ({ name, value })));
    });
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

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem'}}>
        <div className="card">
          <h3 style={{marginBottom:'1rem'}}>Welcome, Admin 👋</h3>
          <p style={{color:'#666', lineHeight:'1.8'}}>
            This is the Hostel Room Allocation Management System.<br/>
            Use the navigation above to manage students, rooms and allocations.
          </p>
        </div>

        <div className="card">
          <h3 style={{marginBottom:'1rem'}}>Students by Branch</h3>
          {branchData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={branchData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({name, value}) => `${name}: ${value}`}
                >
                  {branchData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p style={{color:'#666'}}>No data yet</p>
          )}
        </div>
      </div>
    </div>
  );
}