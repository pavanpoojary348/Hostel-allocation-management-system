import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (form.username === 'admin' && form.password === 'admin123') {
      navigate('/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>🏠 Hostel MS</h2>
        <p>Login to your account</p>
        <input
          placeholder="Username"
          value={form.username}
          onChange={e => setForm({...form, username: e.target.value})}
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={e => setForm({...form, password: e.target.value})}
        />
        <button style={{width:'100%'}} onClick={handleLogin}>Login</button>
        {error && <p className="error">{error}</p>}
        <p style={{marginTop:'1rem', textAlign:'center', color:'#666', fontSize:'13px'}}>
          Username: admin &nbsp;|&nbsp; Password: admin123
        </p>
             <p style={{marginTop:'1rem', textAlign:'center', fontSize:'13px'}}>
  Student? <Link to="/student-login" style={{color:'#e94560'}}>Student Login</Link>
</p>
      </div>
    </div>
  );
}