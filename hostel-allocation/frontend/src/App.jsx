import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
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
import ForgotPassword from './pages/ForgotPassword';
import Waitlist from './pages/Waitlist';
import { LayoutDashboard, Users, DoorOpen, LogOut } from 'lucide-react';

const NAV_LINKS = [
  {
    to: '/dashboard', label: 'Dashboard',
    icon: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></>
  },
  {
    to: '/students', label: 'Students',
    icon: <><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></>
  },
  {
    to: '/rooms', label: 'Rooms',
    icon: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M3 9h6"/></>
  },
  {
    to: '/allocations', label: 'Allocations',
    icon: <><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5"/></>
  },
  {
    to: '/er-diagram', label: 'ER Diagram',
    icon: <><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/></>
  },
  {
    to: '/waitlist', label: 'Waitlist',
    icon: <><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3" cy="6" r="1.5"/><circle cx="3" cy="12" r="1.5"/><circle cx="3" cy="18" r="1.5"/></>
  },
];

function SunIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
    </svg>
  );
}

function NavLink({ to, label, icon, dark }) {
  const { pathname } = useLocation();
  const isActive = pathname === to;
  return (
    <Link
      to={to}
      className={`
        flex items-center gap-1.5 px-3 py-1.5 rounded-[9px] text-[13px] font-semibold
        transition-all duration-150 no-underline whitespace-nowrap
        ${isActive
          ? 'bg-indigo-500/10 text-indigo-500'
          : dark
            ? 'text-white/40 hover:text-white hover:bg-white/10'
            : 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-500/10'
        }
      `}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className="flex-shrink-0">
        {icon}
      </svg>
      {label}
    </Link>
  );
}

function Navbar({ dark, setDark }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("adminLoggedIn");
      navigate("/");
    }
  };

  return (
    <nav className={`
      flex items-center gap-1 px-5 h-[60px] sticky top-0 z-50
      border-b transition-colors duration-300
      ${dark
        ? 'bg-[#0d0f1a] border-white/[0.07]'
        : 'bg-white/80 border-black/[0.06] backdrop-blur-xl'
      }
    `}>

      {/* Brand */}
      <Link to="/dashboard" className="flex items-center gap-2 mr-4 no-underline flex-shrink-0">
        <div className="w-8 h-8 bg-indigo-500 rounded-[9px] flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
        <span className={`text-[15px] font-extrabold tracking-tight ${dark ? 'text-white' : 'text-indigo-950'}`}>
          Hostel MS
        </span>
      </Link>

      {/* Divider */}
      <div className={`w-px h-5 mx-2 flex-shrink-0 ${dark ? 'bg-white/10' : 'bg-black/10'}`}/>

      {/* Nav Links */}
      {NAV_LINKS.map(link => (
        <NavLink key={link.to} {...link} dark={dark} />
      ))}

      {/* Right Side */}
      <div className="ml-auto flex items-center gap-2">

        {/* Theme Toggle — shows what it SWITCHES TO */}
        <button
          onClick={() => setDark(!dark)}
          className={`
            flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold
            border transition-all duration-200 hover:scale-105
            ${dark
              ? 'bg-white/[0.08] border-white/[0.12] text-white/70 hover:bg-white/[0.14]'
              : 'bg-slate-100 border-black/10 text-slate-600 hover:bg-slate-200'
            }
          `}
        >
          {dark ? <SunIcon /> : <MoonIcon />}
          {dark ? 'Light' : 'Dark'}
        </button>

        {/* Avatar + Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center
                       text-white text-xs font-bold cursor-pointer select-none
                       hover:bg-indigo-600 transition-all duration-200"
          >
            AD
          </button>

          {showDropdown && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
              <div className={`
                absolute right-0 mt-2 w-52 rounded-xl shadow-xl z-50
                border overflow-hidden
                ${dark
                  ? 'bg-[#13152a] border-white/10 shadow-black/40'
                  : 'bg-white border-gray-100 shadow-slate-200'
                }
              `}>
                {/* Admin Info */}
                <div className={`px-4 py-3 border-b ${dark ? 'border-white/10' : 'border-gray-100'}`}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                      AD
                    </div>
                    <div>
                      <p className={`text-sm font-semibold leading-tight ${dark ? 'text-white' : 'text-gray-800'}`}>
                        Admin
                      </p>
                      <p className={`text-xs leading-tight ${dark ? 'text-white/40' : 'text-gray-400'}`}>
                        admin@hostel.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  {[
                    { label: 'Dashboard', icon: <LayoutDashboard size={15}/>, path: '/dashboard' },
                    { label: 'Students',  icon: <Users size={15}/>,           path: '/students'  },
                    { label: 'Rooms',     icon: <DoorOpen size={15}/>,        path: '/rooms'     },
                  ].map(item => (
                    <button
                      key={item.path}
                      onClick={() => { setShowDropdown(false); navigate(item.path); }}
                      className={`
                        w-full text-left px-4 py-2.5 text-sm flex items-center gap-2.5 transition-colors
                        ${dark
                          ? 'text-white/60 hover:bg-white/5 hover:text-white'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }
                      `}
                    >
                      {item.icon} {item.label}
                    </button>
                  ))}
                </div>

                <div className={`border-t ${dark ? 'border-white/10' : 'border-gray-100'}`} />

                <div className="py-1">
                  <button
                    onClick={() => { setShowDropdown(false); handleLogout(); }}
                    className={`
                      w-full text-left px-4 py-2.5 text-sm font-semibold
                      flex items-center gap-2.5 transition-colors
                      ${dark
                        ? 'text-red-400 hover:bg-red-500/10 hover:text-red-300'
                        : 'text-red-500 hover:bg-red-50 hover:text-red-600'
                      }
                    `}
                  >
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function Layout({ dark, setDark, children }) {
  return (
    <>
      <Navbar dark={dark} setDark={setDark} />
      {children}
    </>
  );
}

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      document.body.style.background = '#0d0f1a';
      document.body.style.color = '#fff';
    } else {
      root.classList.remove('dark');
      document.body.style.background = '';
      document.body.style.color = '';
      document.body.className = 'bg-gradient-to-br from-slate-100 to-indigo-50 text-slate-900';
    }
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/"                  element={<Login />} />
        <Route path="/student-login"     element={<StudentLogin />} />
        <Route path="/student-register"  element={<StudentRegister />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-profile"   element={<StudentProfile />} />
        <Route path="/forgot-password"   element={<ForgotPassword />} />

        {/* Admin Routes */}
        <Route path="/dashboard"   element={<Layout dark={dark} setDark={setDark}><Dashboard /></Layout>} />
        <Route path="/students"    element={<Layout dark={dark} setDark={setDark}><Students /></Layout>} />
        <Route path="/rooms"       element={<Layout dark={dark} setDark={setDark}><Rooms /></Layout>} />
        <Route path="/allocations" element={<Layout dark={dark} setDark={setDark}><Allocations /></Layout>} />
        <Route path="/er-diagram"  element={<Layout dark={dark} setDark={setDark}><ERDiagram /></Layout>} />
        <Route path="/waitlist"    element={<Layout dark={dark} setDark={setDark}><Waitlist /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
