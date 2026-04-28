import { useEffect, useState } from 'react';
import axios from 'axios';

const inputCls = `
  w-full px-3.5 py-2.5 rounded-xl text-sm
  bg-white dark:bg-white/[0.05]
  border border-slate-200 dark:border-white/[0.08]
  text-slate-800 dark:text-white
  placeholder:text-slate-400 dark:placeholder:text-white/25
  focus:outline-none focus:ring-2 focus:ring-indigo-400/50 dark:focus:ring-indigo-500/40
  transition-all duration-200
`;

export default function Allocations() {
  const [allocations, setAllocations] = useState([]);
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({ student_id: '1', room_id: '1' });
  const [msg, setMsg] = useState({ text: '', ok: true });
  const [search, setSearch] = useState('');

  const fetchAll = () => {
    axios.get('http://localhost:5000/api/allocations').then(res => setAllocations(res.data));
    axios.get('http://localhost:5000/api/students').then(res => setStudents(res.data));
    axios.get('http://localhost:5000/api/rooms').then(res => setRooms(res.data));
  };

  useEffect(() => { fetchAll(); }, []);

  const handleAllocate = async () => {
    if (!form.student_id || !form.room_id) {
      setMsg({ text: 'Please select both student and room!', ok: false });
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/allocations', form);
      setMsg({ text: 'Room allocated successfully!', ok: true });
      setForm({ student_id: '1', room_id: '1' });
      fetchAll();
    } catch (err) {
      setMsg({ text: 'Error: ' + (err.response?.data?.message || 'Something went wrong'), ok: false });
    }
  };

  const handleAutoAllocate = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/allocations/auto-allocate');
      setMsg({ text: res.data.message, ok: true });
      fetchAll();
    } catch (err) {
      setMsg({ text: 'Error: ' + err.response?.data?.message, ok: false });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Cancel this allocation?')) return;
    await axios.delete(`http://localhost:5000/api/allocations/${id}`);
    setMsg({ text: 'Allocation cancelled!', ok: true });
    fetchAll();
  };

  const filteredStudents = students.filter(s =>
    search === '' ||
    (s.usn && s.usn.toLowerCase().includes(search.toLowerCase())) ||
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0d0f1a] transition-colors duration-300 p-6">
      <div className="max-w-7xl mx-auto space-y-5">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            ✅ Allocations
          </h2>
          <span className="text-sm font-medium text-slate-400 dark:text-white/30">
            Total: {allocations.length}
          </span>
        </div>

        {/* FORM CARD */}
        <div className="
          rounded-2xl p-6 space-y-4
          bg-white dark:bg-[#13152a]
          border border-slate-100 dark:border-white/[0.08]
          shadow-sm dark:shadow-black/30
        ">
          <h3 className="text-base font-bold text-slate-800 dark:text-white">
            Allocate Room
          </h3>

          {/* Search */}
          <input
            placeholder="🔍 Search student by name or USN..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={inputCls}
          />

          {/* Selects */}
          <div className="grid md:grid-cols-2 gap-4">
            <select
              value={form.student_id}
              onChange={e => setForm({ ...form, student_id: e.target.value })}
              className={inputCls}
            >
              <option value="">Select Student</option>
              {filteredStudents.map(s => (
                <option key={s.student_id} value={s.student_id}>
                  {s.name}{s.usn ? ` — ${s.usn}` : ''}
                </option>
              ))}
            </select>

            <select
              value={form.room_id}
              onChange={e => setForm({ ...form, room_id: e.target.value })}
              className={inputCls}
            >
              <option value="">Select Room</option>
              {rooms
                .filter(r => r.availability_status === 'Available')
                .map(r => (
                  <option key={r.room_id} value={r.room_id}>
                    Room {r.room_id} — Floor {r.floor} — ₹{r.price}
                  </option>
                ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 pt-1">
            <button
              onClick={handleAllocate}
              className="
                px-5 py-2.5 rounded-xl text-sm font-semibold text-white
                bg-indigo-500 hover:bg-indigo-600
                transition-all duration-200 shadow-sm
              "
            >
              Allocate Room
            </button>

            <button
              onClick={handleAutoAllocate}
              className="
                px-5 py-2.5 rounded-xl text-sm font-semibold text-white
                bg-violet-500 hover:bg-violet-600
                transition-all duration-200 shadow-sm
              "
            >
              ⚡ Auto Allocate
            </button>
          </div>

          {/* Message */}
          {msg.text && (
            <p className={`text-sm font-medium ${
              msg.ok
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-red-500 dark:text-red-400'
            }`}>
              {msg.text}
            </p>
          )}
        </div>

        {/* TABLE */}
        <div className="
          rounded-2xl overflow-hidden
          bg-white dark:bg-[#13152a]
          border border-slate-100 dark:border-white/[0.08]
          shadow-sm dark:shadow-black/30
        ">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead>
                <tr className="
                  bg-slate-50 dark:bg-white/[0.04]
                  border-b border-slate-100 dark:border-white/[0.07]
                ">
                  {['ID','Student','USN','Room','Floor','Price','Date','Status','Action'].map(col => (
                    <th key={col} className="
                      px-5 py-3.5 text-left
                      text-[11px] font-bold uppercase tracking-wider
                      text-slate-400 dark:text-white/30
                    ">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {allocations.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-10 text-slate-400 dark:text-white/25">
                      No allocations yet
                    </td>
                  </tr>
                ) : (
                  allocations.map((a, i) => (
                    <tr key={a.allocation_id}
                      className="
                        border-b border-slate-50 dark:border-white/[0.04] last:border-0
                        bg-white dark:bg-transparent
                        even:bg-slate-50/60 dark:even:bg-white/[0.02]
                        hover:bg-indigo-50/60 dark:hover:bg-indigo-500/[0.06]
                        transition-colors duration-150
                      ">

                      <td className="px-5 py-3.5 text-slate-400 dark:text-white/25 text-xs">
                        {a.allocation_id}
                      </td>

                      <td className="px-5 py-3.5 font-semibold text-slate-800 dark:text-white">
                        {a.name}
                      </td>

                      <td className="px-5 py-3.5 text-slate-400 dark:text-white/40 font-mono text-xs">
                        {a.usn || '—'}
                      </td>

                      <td className="px-5 py-3.5 text-slate-600 dark:text-white/60">
                        Room {a.room_id}
                      </td>

                      <td className="px-5 py-3.5 text-slate-500 dark:text-white/50">
                        Floor {a.floor}
                      </td>

                      <td className="px-5 py-3.5 font-semibold text-emerald-600 dark:text-emerald-400">
                        ₹{a.price}
                      </td>

                      <td className="px-5 py-3.5 text-slate-400 dark:text-white/30 text-xs">
                        {new Date(a.allocation_date).toLocaleDateString()}
                      </td>

                      <td className="px-5 py-3.5">
                        <span className="
                          px-2.5 py-1 rounded-full text-xs font-semibold
                          bg-emerald-50 text-emerald-600
                          dark:bg-emerald-500/15 dark:text-emerald-300
                        ">
                          {a.status}
                        </span>
                      </td>

                      <td className="px-5 py-3.5">
                        <button
                          onClick={() => handleDelete(a.allocation_id)}
                          className="
                            px-3 py-1.5 rounded-lg text-xs font-semibold text-white
                            bg-red-500 hover:bg-red-600
                            dark:bg-red-500/80 dark:hover:bg-red-500
                            transition-all duration-150
                          "
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}