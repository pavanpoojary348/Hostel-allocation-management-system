import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function StudentLogin() {
  const [form, setForm] = useState({ usn: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/students/login', form);
      localStorage.setItem('student', JSON.stringify(res.data.student));
      navigate('/student-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-blue-100">

      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl p-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2">
          🎓 Student Login
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login with your USN & password
        </p>

        {/* Inputs */}
        <input
          className="w-full mb-4 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          placeholder="USN (e.g. 4NM23IS001)"
          value={form.usn}
          onChange={e => setForm({ ...form, usn: e.target.value })}
        />

        <input
          type="password"
          className="w-full mb-4 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition shadow-md hover:scale-[1.02]"
        >
          Login
        </button>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">
            {error}
          </p>
        )}

        {/* Links */}
        <div className="mt-5 text-center text-sm text-gray-600 space-y-2">
          <p>
            <Link to="/forgot-password" className="text-indigo-500 hover:underline">
              Forgot Password?
            </Link>
          </p>

          <p>
            New student?{' '}
            <Link to="/student-register" className="text-indigo-500 hover:underline">
              Register here
            </Link>
          </p>

          <p>
            Admin?{' '}
            <Link to="/" className="text-indigo-500 hover:underline">
              Admin Login
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}