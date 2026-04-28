import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then(res => setStudents(res.data));
  }, []);

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    (s.usn && s.usn.toLowerCase().includes(search.toLowerCase())) ||
    (s.department && s.department.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0d0f1a] transition-colors duration-300 p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            🎓 Students
          </h2>
          <span className="text-sm font-medium text-slate-400 dark:text-white/30">
            Total: {filteredStudents.length}
          </span>
        </div>

        {/* SEARCH BAR */}
        <div className="mb-6">
          <input
            placeholder="Search by name, USN or department..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="
              w-full md:w-1/3 px-4 py-3 rounded-xl text-sm
              bg-white dark:bg-white/[0.05]
              border border-slate-200 dark:border-white/[0.08]
              text-slate-800 dark:text-white
              placeholder:text-slate-400 dark:placeholder:text-white/25
              focus:outline-none focus:ring-2 focus:ring-indigo-400/50 dark:focus:ring-indigo-500/40
              shadow-sm dark:shadow-none
              transition-all duration-200
            "
          />
        </div>

        {/* TABLE CARD */}
        <div className="
          rounded-2xl overflow-hidden
          bg-white dark:bg-[#13152a]
          border border-slate-100 dark:border-white/[0.08]
          shadow-sm dark:shadow-black/30
        ">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              {/* HEADER */}
              <thead>
                <tr className="
                  bg-slate-50 dark:bg-white/[0.04]
                  border-b border-slate-100 dark:border-white/[0.07]
                ">
                  {['ID','Name','USN','Gender','Year','Department','Budget'].map(col => (
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

              {/* BODY */}
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-10 text-slate-400 dark:text-white/25">
                      No students found
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((s, i) => (
                    <tr
                      key={s.student_id}
                      className="
                        border-b border-slate-50 dark:border-white/[0.04] last:border-0
                        bg-white dark:bg-transparent
                        even:bg-slate-50/60 dark:even:bg-white/[0.02]
                        hover:bg-indigo-50/60 dark:hover:bg-indigo-500/[0.06]
                        transition-colors duration-150
                      "
                    >
                      <td className="px-5 py-3.5 text-slate-400 dark:text-white/25 text-xs">
                        {s.student_id}
                      </td>

                      <td className="px-5 py-3.5 font-semibold text-slate-800 dark:text-white">
                        {s.name}
                      </td>

                      <td className="px-5 py-3.5 text-slate-400 dark:text-white/40 font-mono text-xs">
                        {s.usn || '—'}
                      </td>

                      <td className="px-5 py-3.5">
                        <span className={`
                          px-2.5 py-1 rounded-full text-xs font-semibold
                          ${s.gender === 'Male'
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-300'
                            : 'bg-pink-50 text-pink-600 dark:bg-pink-500/15 dark:text-pink-300'
                          }
                        `}>
                          {s.gender}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 text-slate-500 dark:text-white/40">
                        {s.year || '—'}
                      </td>

                      <td className="px-5 py-3.5 text-slate-600 dark:text-white/60">
                        {s.department}
                      </td>

                      <td className="px-5 py-3.5 font-semibold text-emerald-600 dark:text-emerald-400">
                        ₹{s.budget}
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
