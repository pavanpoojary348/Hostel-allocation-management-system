import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [usn, setUsn] = useState('');
  const [mobile, setMobile] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/students/verify', { usn, mobile });
      if (res.data.verified) {
        setStep(2);
        setError('');
      }
    } catch(err) {
      setError(err.response?.data?.message || 'USN or mobile not found');
    }
  };

  const handleReset = async () => {
    try {
      await axios.post('http://localhost:5000/api/students/reset-password', { usn, newPassword });
      setMsg('Password reset successfully!');
      setTimeout(() => navigate('/student-login'), 1500);
    } catch(err) {
      setError(err.response?.data?.message || 'Error resetting password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>🔑 Forgot Password</h2>
        <p>{step === 1 ? 'Verify your identity' : 'Set new password'}</p>

        {step === 1 && (
          <>
            <input placeholder="USN (e.g. 4NM23IS001)" value={usn}
              onChange={e => setUsn(e.target.value)} />
            <input placeholder="Registered Mobile Number" value={mobile}
              onChange={e => setMobile(e.target.value)} />
            <button style={{width:'100%'}} onClick={handleVerify}>Verify</button>
          </>
        )}

        {step === 2 && (
          <>
            <input placeholder="New Password" type="password" value={newPassword}
              onChange={e => setNewPassword(e.target.value)} />
            <button style={{width:'100%'}} onClick={handleReset}>Reset Password</button>
          </>
        )}

        {error && <p className="error">{error}</p>}
        {msg && <p className="success">{msg}</p>}

        <p style={{marginTop:'1rem', textAlign:'center', fontSize:'13px'}}>
          <Link to="/student-login" style={{color:'#e94560'}}>Back to Login</Link>
        </p>
      </div>
    </div>
  );
}