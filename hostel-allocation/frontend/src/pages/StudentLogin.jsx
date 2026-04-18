import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function StudentLogin() {
  const [form, setForm] = useState({ usn:'', password:'' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/students/login', form);
      localStorage.setItem('student', JSON.stringify(res.data.student));
      navigate('/student-dashboard');
    } catch(err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>🎓 Student Login</h2>
        <p>Login with your USN and password</p>
        <input placeholder="USN (e.g. 4NM23IS001)" value={form.usn}
          onChange={e => setForm({...form, usn:e.target.value})} />
        <input placeholder="Password" type="password" value={form.password}
          onChange={e => setForm({...form, password:e.target.value})} />
        <button style={{width:'100%'}} onClick={handleLogin}>Login</button>
        {error && <p className="error">{error}</p>}
        <p style={{marginTop:'1rem', textAlign:'center', fontSize:'13px'}}>
          New student? <Link to="/student-register" style={{color:'#e94560'}}>Register here</Link>
        </p>
        <p style={{marginTop:'0.5rem', textAlign:'center', fontSize:'13px'}}>
          Admin? <Link to="/" style={{color:'#e94560'}}>Admin Login</Link>
        </p>
      </div>
    </div>
  );
}