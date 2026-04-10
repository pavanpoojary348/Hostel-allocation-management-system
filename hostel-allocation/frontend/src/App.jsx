import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Rooms from './pages/Rooms';
import Allocations from './pages/Allocations';

function Navbar() {
  return (
    <nav>
      <span className="brand">🏠 Hostel MS</span>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/students">Students</Link>
      <Link to="/rooms">Rooms</Link>
      <Link to="/allocations">Allocations</Link>
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
      </Routes>
    </BrowserRouter>
  );
}