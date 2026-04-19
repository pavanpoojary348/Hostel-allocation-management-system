import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function StudentProfile() {
  const [student, setStudent] = useState(null);
  const [form, setForm] = useState({});
  const [msg, setMsg] = useState('');
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem('student'));
    if (!s) { navigate('/student-login'); return; }
    setStudent(s);
    setForm(s);
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/students/${form.student_id}`, form);
      localStorage.setItem('student', JSON.stringify(form));
      setStudent(form);
      setMsg('Profile updated successfully!');
      setEditing(false);
    } catch(err) {
      setMsg(err.response?.data?.message || 'Error updating profile');
    }
  };

  if (!student) return null;

  return (
    <div style={{minHeight:'100vh', background:'#f0f2f5'}}>
      <nav style={{background:'#1a1a2e', padding:'1rem 2rem', display:'flex', alignItems:'center'}}>
        <span style={{color:'#e94560', fontWeight:'bold', fontSize:'20px', marginRight:'auto'}}>
          🏠 Hostel MS
        </span>
        <button onClick={() => navigate('/student-dashboard')}
          style={{background:'transparent', border:'1px solid #fff', color:'#fff',
            padding:'5px 16px', borderRadius:'6px', marginRight:'1rem'}}>
          ← Back
        </button>
      </nav>

      <div className="page" style={{maxWidth:'600px'}}>
        <h2>My Profile</h2>
        <div className="card">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem'}}>
            <h3>Personal Details</h3>
            <button onClick={() => setEditing(!editing)}
              style={{background: editing ? '#666' : '#e94560', padding:'6px 16px', fontSize:'13px'}}>
              {editing ? 'Cancel' : '✏️ Edit'}
            </button>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
            <div>
              <label style={{fontSize:'12px', color:'#666'}}>Full Name</label>
              <input value={form.name || ''} disabled={!editing}
                onChange={e => setForm({...form, name:e.target.value})}
                style={{opacity: editing ? 1 : 0.7}} />
            </div>
            <div>
              <label style={{fontSize:'12px', color:'#666'}}>USN</label>
              <input value={form.usn || ''} disabled
                style={{opacity:0.7}} />
            </div>
            <div>
              <label style={{fontSize:'12px', color:'#666'}}>Mobile</label>
              <input value={form.mobile || ''} disabled={!editing}
                onChange={e => setForm({...form, mobile:e.target.value})}
                style={{opacity: editing ? 1 : 0.7}} />
            </div>
            <div>
              <label style={{fontSize:'12px', color:'#666'}}>Gender</label>
              <input value={form.gender || ''} disabled
                style={{opacity:0.7}} />
            </div>
            <div>
              <label style={{fontSize:'12px', color:'#666'}}>Branch</label>
              <input value={form.branch || ''} disabled={!editing}
                onChange={e => setForm({...form, branch:e.target.value})}
                style={{opacity: editing ? 1 : 0.7}} />
            </div>
            <div>
              <label style={{fontSize:'12px', color:'#666'}}>Semester</label>
              <input value={form.semester || ''} disabled={!editing}
                onChange={e => setForm({...form, semester:e.target.value})}
                style={{opacity: editing ? 1 : 0.7}} />
            </div>
            <div>
              <label style={{fontSize:'12px', color:'#666'}}>Year</label>
              <input value={form.year || ''} disabled={!editing}
                onChange={e => setForm({...form, year:e.target.value})}
                style={{opacity: editing ? 1 : 0.7}} />
            </div>
            <div>
              <label style={{fontSize:'12px', color:'#666'}}>Budget</label>
              <input value={form.budget || ''} disabled
                style={{opacity:0.7}} />
            </div>
          </div>

          {editing && (
            <button style={{marginTop:'1rem', width:'100%'}} onClick={handleUpdate}>
              Save Changes
            </button>
          )}
          {msg && <p className={msg.includes('successfully') ? 'success' : 'error'}
            style={{marginTop:'1rem'}}>{msg}</p>}
        </div>
      </div>
    </div>
  );
}