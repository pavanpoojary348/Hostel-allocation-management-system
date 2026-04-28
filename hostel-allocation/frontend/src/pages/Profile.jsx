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
  function Input({ label, value, editing, disabled, onChange }) {
  return (
    <div>
      <label className="text-xs text-gray-500">{label}</label>

      <input
        value={value || ''}
        disabled={disabled || !editing}
        onChange={e => onChange && onChange(e.target.value)}
        className={`w-full mt-1 px-4 py-2 rounded-xl border ${
          disabled || !editing
            ? 'bg-gray-100 text-gray-500'
            : 'bg-white'
        } focus:ring-2 focus:ring-indigo-400 outline-none`}
      />
    </div>
  );
}

  return (
  <div className="min-h-screen bg-gray-100">

    {/* NAVBAR */}
    <div className="bg-indigo-900 text-white px-6 py-4 flex items-center">
      <h1 className="text-xl font-bold mr-auto">🏠 Hostel MS</h1>

      <button
        onClick={() => navigate('/student-dashboard')}
        className="px-4 py-1 border rounded hover:bg-white hover:text-black transition"
      >
        ← Back
      </button>
    </div>

    <div className="max-w-3xl mx-auto p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">👤 My Profile</h2>

        <button
          onClick={() => setEditing(!editing)}
          className={`px-4 py-2 rounded-xl text-white transition ${
            editing
              ? 'bg-gray-500 hover:bg-gray-600'
              : 'bg-indigo-500 hover:bg-indigo-600'
          }`}
        >
          {editing ? 'Cancel' : '✏️ Edit'}
        </button>
      </div>

      {/* CARD */}
      <div className="bg-white shadow-xl rounded-2xl p-6 space-y-6">

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-5">

          <Input label="Full Name" value={form.name} editing={editing}
            onChange={v => setForm({...form, name:v})} />

          <Input label="USN" value={form.usn} disabled />

          <Input label="Mobile" value={form.mobile} editing={editing}
            onChange={v => setForm({...form, mobile:v})} />

          <Input label="Gender" value={form.gender} disabled />

          <Input label="Branch" value={form.branch} editing={editing}
            onChange={v => setForm({...form, branch:v})} />

          <Input label="Semester" value={form.semester} editing={editing}
            onChange={v => setForm({...form, semester:v})} />

          <Input label="Year" value={form.year} editing={editing}
            onChange={v => setForm({...form, year:v})} />

          <Input label="Budget" value={`₹${form.budget}`} disabled />

        </div>

        {/* SAVE BUTTON */}
        {editing && (
          <button
            onClick={handleUpdate}
            className="w-full bg-indigo-500 text-white py-3 rounded-xl hover:bg-indigo-600 transition"
          >
            💾 Save Changes
          </button>
        )}

        {/* MESSAGE */}
        {msg && (
          <div className={`text-center text-sm font-medium ${
            msg.includes('success')
              ? 'text-green-600'
              : 'text-red-500'
          }`}>
            {msg}
          </div>
        )}

      </div>
    </div>
  </div>
);
}