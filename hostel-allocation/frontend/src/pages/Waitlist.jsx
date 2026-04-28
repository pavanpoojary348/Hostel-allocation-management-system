import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Waitlist() {
  const [waitlist, setWaitlist] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [msg, setMsg] = useState('');

  const fetchAll = () => {
    axios.get('http://localhost:5000/api/waitlist')
      .then(res => setWaitlist(res.data));

    axios.get('http://localhost:5000/api/rooms')
      .then(res => setRooms(res.data));
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleAllocate = async (waitlist_id, room_id) => {
    if (!room_id) {
      setMsg('Please select a room!');
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/waitlist/allocate/${waitlist_id}`,
        { room_id }
      );

      setMsg('Student allocated from waitlist!');
      fetchAll();
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  const availableRooms = rooms.filter(
    r => r.availability_status === 'Available'
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">

      {/* HEADER */}
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
        Waitlist
      </h2>

      {/* MESSAGE */}
      {msg && (
        <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-4 py-2 rounded-lg text-sm font-medium shadow">
          {msg}
        </div>
      )}

      {/* TABLE CARD */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors">

        <table className="w-full text-sm">

          {/* TABLE HEAD */}
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs">
            <tr>
              <th className="p-3">ID</th>
              <th>Student</th>
              <th>USN</th>
              <th>Branch</th>
              <th>Sem</th>
              <th>Budget</th>
              <th>Requested</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            {waitlist.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  className="text-center p-6 text-gray-400 dark:text-gray-500"
                >
                  No students in waitlist
                </td>
              </tr>
            ) : (
              waitlist.map(w => (
                <tr
                  key={w.waitlist_id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="p-3 text-gray-700 dark:text-gray-200">
                    {w.waitlist_id}
                  </td>

                  <td className="font-medium text-gray-800 dark:text-gray-100">
                    {w.name}
                  </td>

                  <td className="text-gray-700 dark:text-gray-300">
                    {w.usn || '-'}
                  </td>

                  <td className="text-gray-700 dark:text-gray-300">
                    {w.branch}
                  </td>

                  <td className="text-gray-700 dark:text-gray-300">
                    {w.semester}
                  </td>

                  <td className="text-gray-700 dark:text-gray-300">
                    ₹{w.budget}
                  </td>

                  <td className="text-gray-700 dark:text-gray-300">
                    {new Date(w.requested_at).toLocaleDateString()}
                  </td>

                  {/* STATUS */}
                  <td>
                    <span
                      className={
                        w.status === 'Waiting'
                          ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-3 py-1 rounded-full text-xs font-semibold'
                          : 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 px-3 py-1 rounded-full text-xs font-semibold'
                      }
                    >
                      {w.status}
                    </span>
                  </td>

                  {/* ACTION */}
                  <td>
                    {w.status === 'Waiting' && (
                      <select
                        onChange={e =>
                          handleAllocate(w.waitlist_id, e.target.value)
                        }
                        className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-white px-2 py-1 rounded-md text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                      >
                        <option value="">Assign Room</option>
                        {availableRooms.map(r => (
                          <option key={r.room_id} value={r.room_id}>
                            Room {r.room_id} - ₹{r.price}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}