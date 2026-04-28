import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [allocation, setAllocation] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [roommates, setRoomates] = useState([]);
  const [waitlistMsg, setWaitlistMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem('student'));
    if (!s) { navigate('/student-login'); return; }
    setStudent(s);

    axios.get(`http://localhost:5000/api/allocations/student/${s.student_id}`)
      .then(res => {
        setAllocation(res.data);
        axios.get(`http://localhost:5000/api/allocations/roommates/${res.data.room_id}/${s.student_id}`)
          .then(r => setRoomates(r.data))
          .catch(() => setRoomates([]));
      })
      .catch(() => setAllocation(null));

    axios.get(`http://localhost:5000/api/notifications/${s.student_id}`)
      .then(res => {
        setNotifications(res.data);
        axios.put(`http://localhost:5000/api/notifications/read/${s.student_id}`);
      })
      .catch(() => setNotifications([]));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('student');
    navigate('/student-login');
  };

  const handleJoinWaitlist = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/waitlist', { student_id: student.student_id });
      setWaitlistMsg(res.data.message);
    } catch(err) {
      setWaitlistMsg(err.response?.data?.message || 'Error joining waitlist');
    }
  };

  if (!student) return null;

  const unread = notifications.filter(n => n.is_read === 0).length;

  return (
  <div className="min-h-screen bg-gray-100">

    {/* NAVBAR */}
    <div className="bg-indigo-900 text-white px-6 py-4 flex items-center">
      <h1 className="text-xl font-bold mr-auto">🏠 Hostel MS</h1>

      <span className="mr-4">👋 {student.name}</span>

      {unread > 0 && (
        <span className="bg-red-500 px-2 py-1 rounded-full text-xs mr-4">
          {unread}
        </span>
      )}

      <button
        onClick={() => navigate('/student-profile')}
        className="mr-3 px-4 py-1 border rounded hover:bg-white hover:text-black transition"
      >
        Profile
      </button>

      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-1 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>

    <div className="p-6 max-w-7xl mx-auto">

      {/* TITLE */}
      <h2 className="text-3xl font-bold mb-6">📊 My Dashboard</h2>

      {/* NOTIFICATIONS */}
      {notifications.length > 0 && (
        <div className="mb-6 space-y-2">
          {notifications.map(n => (
            <div
              key={n.notif_id}
              className={`p-4 rounded-xl shadow ${
                n.is_read === 0
                  ? "bg-green-50 border-l-4 border-green-500"
                  : "bg-white"
              }`}
            >
              <p>{n.message}</p>
              <span className="text-xs text-gray-400">
                {new Date(n.created_at).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* STUDENT INFO CARDS */}
      <div className="grid md:grid-cols-4 gap-6 mb-6">

        <div className="bg-white p-5 rounded-2xl shadow text-center">
          <p className="text-gray-500 text-sm">USN</p>
          <h3 className="font-bold">{student.usn}</h3>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow text-center">
          <p className="text-gray-500 text-sm">Branch</p>
          <h3 className="font-bold">{student.branch}</h3>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow text-center">
          <p className="text-gray-500 text-sm">Semester</p>
          <h3 className="font-bold">Sem {student.semester}</h3>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow text-center">
          <p className="text-gray-500 text-sm">Budget</p>
          <h3 className="font-bold text-green-600">₹{student.budget}</h3>
        </div>

      </div>

      {/* ALLOCATION */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">🏠 Room Allocation</h3>

        {allocation ? (
          <div className="grid md:grid-cols-4 gap-4 text-center">

            <div>
              <p className="text-gray-500 text-sm">Room</p>
              <h4 className="font-bold">Room {allocation.room_id}</h4>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Floor</p>
              <h4 className="font-bold">{allocation.floor}</h4>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Price</p>
              <h4 className="font-bold text-green-600">₹{allocation.price}</h4>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Status</p>
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                {allocation.status}
              </span>
            </div>

          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-500 mb-3">
              No room allocated yet
            </p>

            <button
              onClick={handleJoinWaitlist}
              className="bg-indigo-500 text-white px-5 py-2 rounded-xl hover:bg-indigo-600 transition"
            >
              ⏳ Join Waitlist
            </button>

            {waitlistMsg && (
              <p className="text-green-600 mt-2">{waitlistMsg}</p>
            )}
          </div>
        )}
      </div>

      {/* ROOMMATES */}
      {allocation && (
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-4">👥 Roommates</h3>

          {roommates.length === 0 ? (
            <p className="text-gray-500">No roommates yet</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {roommates.map((r, i) => (
                <div key={i} className="border p-4 rounded-xl">
                  <p className="font-semibold">{r.name}</p>
                  <p className="text-sm text-gray-500">{r.usn}</p>
                  <p className="text-sm text-gray-500">{r.branch}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  </div>
)};