import { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#6366f1','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#f97316'];

function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const dur = 900, start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      setDisplay(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);
  return <>{display}</>;
}

const CustomTooltip = ({ active, payload, total }) => {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];
  return (
    <div className="bg-slate-900 text-white text-xs px-3 py-2 rounded-xl shadow-xl">
      <p className="font-bold">{name}</p>
      <p className="text-slate-300">{value} students ({Math.round(value / total * 100)}%)</p>
    </div>
  );
};

const QUICK_LINKS = [
  {
    label: 'Manage Students', to: '/students', stroke: '#6366f1',
    iconBgLight: 'bg-indigo-50', iconBgDark: 'dark:bg-indigo-500/15',
    icon: <><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></>
  },
  {
    label: 'View Rooms', to: '/rooms', stroke: '#10b981',
    iconBgLight: 'bg-emerald-50', iconBgDark: 'dark:bg-emerald-500/15',
    icon: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M3 9h6"/></>
  },
  {
    label: 'Allocations', to: '/allocations', stroke: '#f59e0b',
    iconBgLight: 'bg-amber-50', iconBgDark: 'dark:bg-amber-500/15',
    icon: <><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5"/></>
  },
  {
    label: 'Waitlist', to: '/waitlist', stroke: '#a855f7',
    iconBgLight: 'bg-purple-50', iconBgDark: 'dark:bg-purple-500/15',
    icon: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></>
  },
];

export default function Dashboard() {
  const [counts, setCounts] = useState({ students: 0, rooms: 0, allocations: 0 });
  const [branchData, setBranchData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/students').then(res => {
      setCounts(c => ({ ...c, students: res.data.length }));
      const bc = {};
      res.data.forEach(s => { const b = s.branch || s.department || 'Unknown'; bc[b] = (bc[b]||0)+1; });
      setBranchData(Object.entries(bc).map(([name, value]) => ({ name, value })));
    });
    axios.get('http://localhost:5000/api/rooms').then(res => setCounts(c => ({ ...c, rooms: res.data.length })));
    axios.get('http://localhost:5000/api/allocations').then(res => setCounts(c => ({ ...c, allocations: res.data.length })));
  }, []);

  const total = branchData.reduce((a, b) => a + b.value, 0);
  const occupancy = counts.rooms > 0 ? Math.round((counts.allocations / counts.rooms) * 100) : 0;
  const today = new Date().toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' });

  const stats = [
    {
      label: 'Total Students', value: counts.students, color: '#6366f1',
      iconBgLight: 'bg-indigo-50', iconBgDark: 'dark:bg-indigo-500/15',
      badgeLight: 'bg-indigo-50 text-indigo-700',
      badgeDark: 'dark:bg-indigo-500/20 dark:text-indigo-300',
      change: '+12% this month', bar: 'bg-indigo-500',
      icon: <><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></>
    },
    {
      label: 'Total Rooms', value: counts.rooms, color: '#10b981',
      iconBgLight: 'bg-emerald-50', iconBgDark: 'dark:bg-emerald-500/15',
      badgeLight: 'bg-emerald-50 text-emerald-700',
      badgeDark: 'dark:bg-emerald-500/20 dark:text-emerald-300',
      change: '+3 rooms added', bar: 'bg-emerald-500',
      icon: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M3 9h6M3 15h6"/></>
    },
    {
      label: 'Allocations Done', value: counts.allocations, color: '#f59e0b',
      iconBgLight: 'bg-amber-50', iconBgDark: 'dark:bg-amber-500/15',
      badgeLight: 'bg-amber-50 text-amber-700',
      badgeDark: 'dark:bg-amber-500/20 dark:text-amber-300',
      change: `${occupancy}% occupancy`, bar: 'bg-amber-500',
      icon: <><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></>
    },
  ];

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.07) return null;
    const RADIAN = Math.PI / 180;
    const r = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + r * Math.cos(-midAngle * RADIAN);
    const y = cy + r * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central"
        fontSize={11} fontWeight={700}>
        {`${Math.round(percent * 100)}%`}
      </text>
    );
  };

  return (
    <div className="min-h-screen p-6 font-sans transition-colors duration-300
      bg-slate-50 dark:bg-[#0d0f1a]">

      {/* Topbar */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight
            text-slate-900 dark:text-white">
            Hostel Dashboard
          </h1>
          <p className="text-xs mt-0.5 text-slate-400 dark:text-white/30">{today}</p>
        </div>
        <div className="flex items-center gap-2 rounded-full px-4 py-2 text-xs
          bg-white dark:bg-white/5
          border border-slate-200 dark:border-white/10
          text-slate-500 dark:text-white/40">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>
          All systems live
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {stats.map((s, i) => (
          <div key={i} className="relative overflow-hidden rounded-2xl p-5
            bg-white dark:bg-[#13152a]
            border border-slate-100 dark:border-white/[0.08]
            hover:shadow-lg dark:hover:shadow-black/40
            transition-all duration-200">

            <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${s.bar}`}/>

            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4
              ${s.iconBgLight} ${s.iconBgDark}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke={s.color} strokeWidth="2.2" strokeLinecap="round">
                {s.icon}
              </svg>
            </div>

            <div className="text-3xl font-extrabold leading-none mb-1
              text-slate-900 dark:text-white">
              <AnimatedNumber value={s.value} />
            </div>

            <div className="text-[11px] uppercase tracking-wider font-semibold
              text-slate-400 dark:text-white/30">
              {s.label}
            </div>

            <span className={`inline-flex items-center mt-2 text-[11px] font-semibold
              px-2 py-0.5 rounded-md ${s.badgeLight} ${s.badgeDark}`}>
              {s.change}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-5 gap-4">

        {/* Quick Access */}
        <div className="col-span-2 rounded-2xl p-5
          bg-white dark:bg-[#13152a]
          border border-slate-100 dark:border-white/[0.08]">

          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider mb-4
            text-slate-500 dark:text-white/30">
            <span className="w-2 h-2 rounded-full bg-green-400"/>
            Quick access
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight mb-1
            text-slate-900 dark:text-white">
            Welcome, Admin 👋
          </h2>
          <p className="text-sm leading-relaxed mb-5
            text-slate-400 dark:text-white/30">
            Hostel Room Allocation System.<br/>
            Manage students, rooms and allocations easily.
          </p>

          <div className="flex flex-col gap-2">
            {QUICK_LINKS.map((q, i) => (
              <a key={i} href={q.to}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl
                  no-underline group transition-all duration-150
                  bg-slate-50 dark:bg-white/[0.04]
                  hover:bg-indigo-50 dark:hover:bg-indigo-500/10
                  border border-slate-100 dark:border-white/[0.06]
                  hover:border-indigo-200 dark:hover:border-indigo-500/30">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center
                    ${q.iconBgLight} ${q.iconBgDark}`}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                      stroke={q.stroke} strokeWidth="2.2" strokeLinecap="round">
                      {q.icon}
                    </svg>
                  </div>
                  <span className="text-sm font-semibold
                    text-slate-700 dark:text-white/70
                    group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                    {q.label}
                  </span>
                </div>
                <span className="text-lg
                  text-slate-300 dark:text-white/20
                  group-hover:text-indigo-400">›</span>
              </a>
            ))}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="col-span-3 rounded-2xl p-5
          bg-white dark:bg-[#13152a]
          border border-slate-100 dark:border-white/[0.08]">

          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider mb-4
            text-slate-500 dark:text-white/30">
            <span className="w-2 h-2 rounded-full bg-indigo-500"/>
            Students by branch
          </div>

          {branchData.length === 0 ? (
            <p className="text-sm text-slate-400 dark:text-white/30">No data yet</p>
          ) : (
            <div className="flex gap-6 items-center">
              <div style={{ width: 240, height: 240, flexShrink: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={branchData} cx="50%" cy="50%"
                      innerRadius={60} outerRadius={110}
                      dataKey="value" labelLine={false}
                      label={renderCustomLabel} paddingAngle={2}>
                      {branchData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]}
                          stroke="transparent" strokeWidth={3}/>
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip total={total} />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="flex-1 grid grid-cols-1 gap-1.5">
                {branchData.map((d, i) => (
                  <div key={i} className="flex items-center gap-2.5 px-3 py-2 rounded-xl
                    transition-colors
                    bg-slate-50 dark:bg-white/[0.04]
                    hover:bg-slate-100 dark:hover:bg-white/[0.08]">
                    <div className="w-3 h-3 rounded flex-shrink-0"
                      style={{ background: COLORS[i % COLORS.length] }}/>
                    <span className="text-sm flex-1 text-slate-600 dark:text-white/60">
                      {d.name}
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {d.value}
                    </span>
                    <span className="text-xs w-9 text-right text-slate-400 dark:text-white/30">
                      {Math.round(d.value / total * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
