import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (form.username === 'admin' && form.password === 'admin123') {
      navigate('/dashboard');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg,#a8cce0 0%,#c8dff0 40%,#deeef8 70%,#eef6fb 100%)' }}>

      {/* Clouds */}
      {[
        { w:220,h:55,top:'18%',left:'5%',op:0.85 },
        { w:160,h:40,top:'22%',left:'3%',op:0.6 },
        { w:280,h:65,top:'55%',right:'-30px',op:0.75 },
        { w:180,h:45,top:'60%',right:'-10px',op:0.55 },
        { w:120,h:32,top:'35%',left:'60%',op:0.5 },
        { w:90, h:24,top:'12%',right:'15%',op:0.6 },
      ].map((c, i) => (
        <div key={i} className="absolute rounded-full"
          style={{ width:c.w, height:c.h, top:c.top, left:c.left, right:c.right,
            background:'rgba(255,255,255,0.7)', opacity:c.op }} />
      ))}

      {/* Card */}
      <div className="relative z-10 w-[340px] rounded-3xl p-9"
        style={{
          background: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.9)',
          boxShadow: '0 8px 40px rgba(100,150,200,0.18)',
        }}>

        {/* Icon */}
        <div className="w-13 h-13 bg-white rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ width:52,height:52,boxShadow:'0 2px 12px rgba(100,150,200,0.15)' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#555"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
          </svg>
        </div>

        <h2 className="text-[17px] font-semibold text-center mb-1.5 tracking-tight" style={{color:'#1a1a2e'}}>
          Sign in with account
        </h2>
        <p className="text-[13px] text-center mb-6 leading-5" style={{color:'#7a8fa6'}}>
          Access your hostel management portal.<br/>Quick, secure, and free.
        </p>

        {error && (
          <div className="mb-3 px-3 py-2 rounded-lg text-xs text-center text-red-600"
            style={{background:'rgba(255,80,80,0.08)',border:'1px solid rgba(255,100,100,0.3)'}}>
            {error}
          </div>
        )}

        <input
          className="w-full px-3.5 py-2.5 rounded-xl text-[13.5px] mb-2.5 outline-none transition-all"
          style={{border:'1px solid rgba(180,200,220,0.6)',background:'rgba(255,255,255,0.6)',color:'#1a1a2e'}}
          placeholder="Username"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
        />

        <div className="relative mb-2">
          <Link to="/forgot-password"
            className="absolute -top-5 right-0 text-[11.5px] font-medium no-underline hover:underline"
            style={{color:'#5a9fd4'}}>
            Forgot password?
          </Link>
          <input
            className="w-full px-3.5 py-2.5 rounded-xl text-[13.5px] outline-none transition-all"
            style={{border:'1px solid rgba(180,200,220,0.6)',background:'rgba(255,255,255,0.6)',color:'#1a1a2e'}}
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-xl text-white text-[13.5px] font-medium mt-1.5 transition-all hover:-translate-y-0.5 active:translate-y-0"
          style={{background:'#1a1a2e',letterSpacing:'0.2px'}}>
          Get Started
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2.5 my-4">
          <div className="flex-1 h-px" style={{background:'rgba(180,200,220,0.5)'}}/>
          <p className="text-[11.5px] whitespace-nowrap" style={{color:'#a8bcd0'}}>Or sign in with</p>
          <div className="flex-1 h-px" style={{background:'rgba(180,200,220,0.5)'}}/>
        </div>

        {/* Social */}
<div className="flex gap-2.5">
  {/* Google */}
  <button className="flex-1 py-2.5 rounded-xl flex items-center justify-center transition-all hover:scale-[1.03]"
    style={{border:'1px solid rgba(180,200,220,0.5)',background:'rgba(255,255,255,0.5)'}}>
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  </button>

  {/* Facebook */}
  <button className="flex-1 py-2.5 rounded-xl flex items-center justify-center transition-all hover:scale-[1.03]"
    style={{border:'1px solid rgba(180,200,220,0.5)',background:'rgba(255,255,255,0.5)'}}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  </button>

  {/* Apple */}
  <button className="flex-1 py-2.5 rounded-xl flex items-center justify-center transition-all hover:scale-[1.03]"
    style={{border:'1px solid rgba(180,200,220,0.5)',background:'rgba(255,255,255,0.5)'}}>
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#000000">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  </button>
</div>

        <p className="text-center text-[11px] mt-3.5" style={{color:'#a0b4c8'}}>
          Demo — <b className="font-medium" style={{color:'#7a8fa6'}}>admin</b> / <b className="font-medium" style={{color:'#7a8fa6'}}>admin123</b>
        </p>

        <p className="text-center text-xs mt-2.5" style={{color:'#a8bcd0'}}>
          Student?{' '}
          <Link to="/student-login" className="font-medium no-underline hover:underline" style={{color:'#5a9fd4'}}>
            Student Login
          </Link>
        </p>
      </div>
    </div>
  );
}