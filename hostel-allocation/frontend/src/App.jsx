import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Rooms from './pages/Rooms';
import Allocations from './pages/Allocations';
import StudentLogin from './pages/StudentLogin';
import StudentRegister from './pages/StudentRegister';
import StudentDashboard from './pages/StudentDashboard';
import ERDiagram from './pages/ERDiagram';
import StudentProfile from './pages/Profile';

function Navbar() {
  const [dark, setDark] = useState(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.body.style.background = dark ? '#0f0f1a' : '#f0f2f5';
    document.body.style.color = dark ? '#fff' : '#333';
    document.body.className = dark ? 'dark' : '';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <nav style={{background: dark ? '#0a0a14' : '#1a1a2e'}}>
      <span className="brand">🏠 Hostel MS</span>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/students">Students</Link>
      <Link to="/rooms">Rooms</Link>
      <Link to="/allocations">Allocations</Link>
      <Link to="/er-diagram">ER Diagram</Link>
      <button onClick={() => setDark(!dark)}
        style={{background:'transparent', border:'1px solid #fff',
          color:'#fff', padding:'5px 12px', borderRadius:'20px', fontSize:'13px', marginLeft:'auto'}}>
        {dark ? '☀️ Light' : '🌙 Dark'}
      </button>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<><Navbar /><Dashboard /></>} />
        <Route path="/students" element={<><Navbar /><Students /></>} />
        <Route path="/rooms" element={<><Navbar /><Rooms /></>} />
        <Route path="/allocations" element={<><Navbar /><Allocations /></>} />
        <Route path="/er-diagram" element={<><Navbar /><ERDiagram /></>} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-register" element={<StudentRegister />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-profile" element={<StudentProfile />} />
      </Routes>
    </BrowserRouter>
  );
}