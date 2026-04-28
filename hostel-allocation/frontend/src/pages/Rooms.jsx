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

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [filters, setFilters] = useState({ ac_type:'', floor:'', status:'', washroom:'' });
  const [form, setForm] = useState({
    floor:1, capacity:2, price:'', block_id:1,
    room_type:'Double', ac_type:'Non-AC', washroom:'Outside'
  });
  const [msg, setMsg] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchRooms = () => {
    axios.get('http://localhost:5000/api/rooms').then(res => setRooms(res.data));
  };

  useEffect(() => { fetchRooms(); }, []);

  const handleAddRoom = async () => {
    try {
      await axios.post('http://localhost:5000/api/rooms', form);
      setMsg('Room added successfully!');
      setShowForm(false);
      fetchRooms();
    } catch(err) {
      setMsg(err.response?.data?.message || 'Error adding room');
    }
  };

  const filtered = rooms.filter(r => {
    if (filters.ac_type && r.ac_type !== filters.ac_type) return false;
    if (filters.floor && r.floor !== parseInt(filters.floor)) return false;
    if (filters.status && r.availability_status !== filters.status) return false;
    if (filters.washroom && r.washroom !== filters.washroom) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0d0f1a] transition-colors duration-300 p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            🏨 Rooms
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="
              px-4 py-2 rounded-xl text-sm font-semibold text-white
              bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400
              transition-all duration-200 shadow-sm
            "
          >
            {showForm ? 'Cancel' : '+ Add Room'}
          </button>
        </div>

        {/* ADD ROOM FORM */}
        {showForm && (
          <div className="
            rounded-2xl p-6 mb-6
            bg-white dark:bg-[#13152a]
            border border-slate-100 dark:border-white/[0.08]
            shadow-sm dark:shadow-black/30
          ">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4">Add New Room</h3>

            <div className="grid md:grid-cols-3 gap-4">
              <select className={inputCls} value={form.floor}
                onChange={e => setForm({...form, floor:e.target.value})}>
                <option value={1}>Floor 1</option>
                <option value={2}>Floor 2</option>
                <option value={3}>Floor 3</option>
              </select>

              <select className={inputCls} value={form.capacity}
                onChange={e => setForm({...form, capacity:e.target.value})}>
                <option value={1}>Capacity: 1</option>
                <option value={2}>Capacity: 2</option>
                <option value={3}>Capacity: 3</option>
              </select>

              <input className={inputCls} placeholder="Price (₹)"
                value={form.price}
                onChange={e => setForm({...form, price:e.target.value})}
              />

              <select className={inputCls} value={form.block_id}
                onChange={e => setForm({...form, block_id:e.target.value})}>
                <option value={1}>Block A</option>
                <option value={2}>Block B</option>
              </select>

              <select className={inputCls} value={form.room_type}
                onChange={e => setForm({...form, room_type:e.target.value})}>
                <option>Single</option>
                <option>Double</option>
                <option>Triple</option>
              </select>

              <select className={inputCls} value={form.ac_type}
                onChange={e => setForm({...form, ac_type:e.target.value})}>
                <option>AC</option>
                <option>Non-AC</option>
              </select>

              <select className={inputCls} value={form.washroom}
                onChange={e => setForm({...form, washroom:e.target.value})}>
                <option>Attached</option>
                <option>Outside</option>
              </select>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <button
                onClick={handleAddRoom}
                className="
                  px-5 py-2 rounded-xl text-sm font-semibold text-white
                  bg-emerald-500 hover:bg-emerald-600
                  transition-all duration-200
                "
              >
                Add Room
              </button>
              {msg && (
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{msg}</p>
              )}
            </div>
          </div>
        )}

        {/* FILTERS */}
        <div className="
          rounded-2xl p-4 mb-6
          bg-white dark:bg-[#13152a]
          border border-slate-100 dark:border-white/[0.08]
          shadow-sm dark:shadow-black/30
        ">
          <div className="grid md:grid-cols-4 gap-3">
            <select className={inputCls}
              onChange={e => setFilters({...filters, ac_type:e.target.value})}>
              <option value="">All AC Types</option>
              <option>AC</option>
              <option>Non-AC</option>
            </select>

            <select className={inputCls}
              onChange={e => setFilters({...filters, floor:e.target.value})}>
              <option value="">All Floors</option>
              <option value="1">Floor 1</option>
              <option value="2">Floor 2</option>
              <option value="3">Floor 3</option>
            </select>

            <select className={inputCls}
              onChange={e => setFilters({...filters, status:e.target.value})}>
              <option value="">All Status</option>
              <option>Available</option>
              <option>Occupied</option>
            </select>

            <select className={inputCls}
              onChange={e => setFilters({...filters, washroom:e.target.value})}>
              <option value="">All Washroom</option>
              <option>Attached</option>
              <option>Outside</option>
            </select>
          </div>

          <div className="mt-3 flex items-center gap-4">
            <button
              onClick={() => setFilters({ac_type:'', floor:'', status:'', washroom:''})}
              className="
                px-4 py-2 rounded-xl text-sm font-semibold
                bg-slate-100 dark:bg-white/[0.07]
                text-slate-600 dark:text-white/50
                hover:bg-slate-200 dark:hover:bg-white/[0.12]
                transition-all duration-150
              "
            >
              Clear Filters
            </button>
            <span className="text-sm text-slate-400 dark:text-white/30">
              Showing <span className="font-semibold text-slate-600 dark:text-white/60">{filtered.length}</span> / {rooms.length} rooms
            </span>
          </div>
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
                  {['Room','Floor','Type','AC','Washroom','Capacity','Price','Status'].map(col => (
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
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-10 text-slate-400 dark:text-white/25">
                      No rooms found
                    </td>
                  </tr>
                ) : (
                  filtered.map((r, i) => (
                    <tr key={r.room_id}
                      className="
                        border-b border-slate-50 dark:border-white/[0.04] last:border-0
                        bg-white dark:bg-transparent
                        even:bg-slate-50/60 dark:even:bg-white/[0.02]
                        hover:bg-indigo-50/60 dark:hover:bg-indigo-500/[0.06]
                        transition-colors duration-150
                      ">

                      <td className="px-5 py-3.5 font-semibold text-slate-800 dark:text-white">
                        {r.room_id}
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 dark:text-white/50">
                        Floor {r.floor}
                      </td>
                      <td className="px-5 py-3.5 text-slate-600 dark:text-white/60">
                        {r.room_type}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`
                          px-2.5 py-1 rounded-full text-xs font-semibold
                          ${r.ac_type === 'AC'
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300'
                            : 'bg-slate-100 text-slate-500 dark:bg-white/[0.07] dark:text-white/40'
                          }
                        `}>
                          {r.ac_type}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 dark:text-white/50">
                        {r.washroom}
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 dark:text-white/50">
                        {r.capacity}
                      </td>
                      <td className="px-5 py-3.5 font-semibold text-emerald-600 dark:text-emerald-400">
                        ₹{r.price}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`
                          px-2.5 py-1 rounded-full text-xs font-semibold
                          ${r.availability_status === 'Available'
                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300'
                            : 'bg-red-50 text-red-500 dark:bg-red-500/15 dark:text-red-300'
                          }
                        `}>
                          {r.availability_status}
                        </span>
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
