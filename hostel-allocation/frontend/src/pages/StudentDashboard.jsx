import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [allocation, setAllocation] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [roommates, setRoomates] = useState([]);
  const [waitlistMsg, setWaitlistMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem('student'));
    if (!s) { navigate('/student-login'); return; }
    setStudent(s);

    axios.get(`http://localhost:5000/api/allocations/student/${s.student_id}`)
      .then(res => {
        setAllocation(res.data);
        axios.get(`http://localhost:5000/api/allocations/roommates/${res.data.room_id}/${s.student_id}`)
          .then(r => setRoomates(r.data))
          .catch(() => setRoomates([]));
      })
      .catch(() => setAllocation(null));

    axios.get(`http://localhost:5000/api/notifications/${s.student_id}`)
      .then(res => {
        setNotifications(res.data);
        axios.put(`http://localhost:5000/api/notifications/read/${s.student_id}`);
      })
      .catch(() => setNotifications([]));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('student');
    navigate('/student-login');
  };

  const handleJoinWaitlist = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/waitlist', { student_id: student.student_id });
      setWaitlistMsg(res.data.message);
    } catch(err) {
      setWaitlistMsg(err.response?.data?.message || 'Error joining waitlist');
    }
  };

  if (!student) return null;

  const unread = notifications.filter(n => n.is_read === 0).length;

  return (
    <div style={{minHeight:'100vh', background:'#f0f2f5'}}>
      <nav style={{background:'#1a1a2e', padding:'1rem 2rem', display:'flex', alignItems:'center'}}>
        <span style={{color:'#e94560', fontWeight:'bold', fontSize:'20px', marginRight:'auto'}}>
          🏠 Hostel MS
        </span>
        <span style={{color:'#fff', marginRight:'1rem'}}>👋 {student.name}</span>
        {unread > 0 && (
          <span style={{background:'#e94560', color:'#fff', borderRadius:'50%',
            padding:'2px 8px', fontSize:'12px', marginRight:'1rem'}}>
            {unread} new
          </span>
        )}
        <button onClick={() => navigate('/student-profile')}
          style={{background:'transparent', border:'1px solid #fff', color:'#fff',
            padding:'5px 16px', borderRadius:'6px', marginRight:'1rem'}}>
          👤 Profile
        </button>
        <button onClick={handleLogout} style={{background:'#e94560', padding:'6px 16px'}}>Logout</button>
      </nav>

      <div className="page">
        <h2>My Dashboard</h2>

        {notifications.length > 0 && (
          <div style={{marginBottom:'1.5rem'}}>
            {notifications.map(n => (
              <div key={n.notif_id} style={{
                background: n.is_read === 0 ? '#e6f9f0' : '#f9f9f9',
                border: '1px solid #ddd',
                borderLeft: n.is_read === 0 ? '4px solid #27ae60' : '4px solid #ddd',
                borderRadius:'8px', padding:'12px 16px', marginBottom:'8px',
                fontSize:'14px', color:'#333'
              }}>
                {n.message}
                <span style={{float:'right', fontSize:'12px', color:'#999'}}>
                  {new Date(n.created_at).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="stats" style={{gridTemplateColumns:'repeat(2,1fr)'}}>
          <div className="stat-card">
            <h3 style={{fontSize:'1.2rem'}}>{student.usn}</h3>
            <p>USN</p>
          </div>
          <div className="stat-card">
            <h3 style={{fontSize:'1.2rem'}}>{student.branch}</h3>
            <p>Branch</p>
          </div>
          <div className="stat-card">
            <h3 style={{fontSize:'1.2rem'}}>Sem {student.semester}</h3>
            <p>Semester</p>
          </div>
          <div className="stat-card">
            <h3 style={{fontSize:'1.2rem'}}>₹{student.budget}</h3>
            <p>Budget</p>
          </div>
        </div>

        <div className="card">
          <h3 style={{marginBottom:'1rem'}}>🏠 Room Allocation Status</h3>
          {allocation ? (
            <table>
              <tbody>
                <tr><td><b>Room</b></td><td>Room {allocation.room_id}</td></tr>
                <tr><td><b>Floor</b></td><td>Floor {allocation.floor}</td></tr>
                <tr><td><b>Price</b></td><td>₹{allocation.price}</td></tr>
                <tr><td><b>Status</b></td><td><span className="badge badge-green">{allocation.status}</span></td></tr>
              </tbody>
            </table>
          ) : (
            <div>
              <p style={{color:'#666'}}>No room allocated yet. Please wait for admin to allocate.</p>
              <button onClick={handleJoinWaitlist}
                style={{marginTop:'1rem', background:'#e94560'}}>
                ⏳ Join Waitlist
              </button>
              {waitlistMsg && <p className="success" style={{marginTop:'0.5rem'}}>{waitlistMsg}</p>}
            </div>
          )}
        </div>

        {allocation && (
          <div className="card" style={{marginTop:'1.5rem'}}>
            <h3 style={{marginBottom:'1rem'}}>👥 Roommates</h3>
            {roommates.length === 0 ? (
              <p style={{color:'#666'}}>No roommates yet.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Name</th><th>USN</th><th>Branch</th><th>Semester</th>
                  </tr>
                </thead>
                <tbody>
                  {roommates.map((r, i) => (
                    <tr key={i}>
                      <td>{r.name}</td>
                      <td>{r.usn || '-'}</td>
                      <td>{r.branch}</td>
                      <td>Sem {r.semester}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}