import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function StudentRegister() {
  const [form, setForm] = useState({
    name:'', gender:'Male', year:1, department:'', budget:'',
    usn:'', course:'', semester:1, branch:'', mobile:'', password:''
  });
  const [pref, setPref] = useState({
    preferred_floor:1, preferred_block:'Block A', max_budget:'', roommate_preference:''
  });
  const [step, setStep] = useState(1);
  const [studentId, setStudentId] = useState(null);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const branches = ['ISE', 'CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'CHEM'];

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/students/register', form);
      setStudentId(res.data.id);
      setMsg('');
      setStep(2);
    } catch(err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  const handlePreferences = async () => {
    try {
      await axios.post('http://localhost:5000/api/students/preferences', {
        ...pref, student_id: studentId
      });
      setMsg('Registration complete!');
      setTimeout(() => navigate('/student-login'), 1500);
    } catch(err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box" style={{width:'460px'}}>
        <h2>🏠 Student Registration</h2>
        <p>{step === 1 ? 'Step 1: Personal Details' : 'Step 2: Room Preferences'}</p>

        {step === 1 && (
          <>
            <input placeholder="Full Name" value={form.name}
              onChange={e => setForm({...form, name:e.target.value})} />
            <input placeholder="USN (e.g. 4NM23IS001)" value={form.usn}
              onChange={e => setForm({...form, usn:e.target.value})} />
            <input placeholder="Mobile Number" value={form.mobile}
              onChange={e => setForm({...form, mobile:e.target.value})} />
            <select value={form.gender}
              onChange={e => setForm({...form, gender:e.target.value})}>
              <option>Male</option>
              <option>Female</option>
            </select>
            <select value={form.branch}
              onChange={e => setForm({...form, branch:e.target.value, department:e.target.value})}>
              <option value="">-- Select Branch --</option>
              {branches.map(b => <option key={b}>{b}</option>)}
            </select>
            <select value={form.semester}
              onChange={e => setForm({...form, semester:e.target.value})}>
              {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
            </select>
            <select value={form.year}
              onChange={e => setForm({...form, year:e.target.value})}>
              {[1,2,3,4].map(y => <option key={y} value={y}>Year {y}</option>)}
            </select>
            <select value={form.budget}
              onChange={e => setForm({...form, budget:e.target.value})}>
              <option value="">-- Select Budget Range --</option>
              <option value="3000">₹3000 and below</option>
              <option value="5000">₹3000 - ₹5000</option>
              <option value="7000">₹5000 - ₹7000</option>
              <option value="10000">₹7000 - ₹10000</option>
              <option value="15000">Above ₹10000</option>
            </select>
            <input placeholder="Password" type="password" value={form.password}
              onChange={e => setForm({...form, password:e.target.value})} />
            <button style={{width:'100%'}} onClick={handleRegister}>Next →</button>
          </>
        )}

        {step === 2 && (
          <>
            <select value={pref.preferred_floor}
              onChange={e => setPref({...pref, preferred_floor:e.target.value})}>
              <option value={1}>Floor 1</option>
              <option value={2}>Floor 2</option>
              <option value={3}>Floor 3</option>
            </select>
            <select value={pref.preferred_block}
              onChange={e => setPref({...pref, preferred_block:e.target.value})}>
              <option>Block A</option>
              <option>Block B</option>
            </select>
           <select value={pref.max_budget}
  onChange={e => setPref({...pref, max_budget:e.target.value})}>
  <option value="">-- Select Max Budget --</option>
  <option value="3000">₹3000 and below</option>
  <option value="5000">₹3000 - ₹5000</option>
  <option value="7000">₹5000 - ₹7000</option>
  <option value="10000">₹7000 - ₹10000</option>
  <option value="15000">Above ₹10000</option>
</select>
            <input placeholder="Roommate's USN (optional, e.g. 4NM23IS002)" value={pref.roommate_preference}
  onChange={e => setPref({...pref, roommate_preference:e.target.value})} />
            <button style={{width:'100%'}} onClick={handlePreferences}>Submit Registration</button>
          </>
        )}

        {msg && <p className={msg.includes('complete') ? 'success' : 'error'}>{msg}</p>}
        <p style={{marginTop:'1rem', textAlign:'center', fontSize:'13px'}}>
          Already registered? <Link to="/student-login" style={{color:'#e94560'}}>Login here</Link>
        </p>
      </div>
    </div>
  );
}