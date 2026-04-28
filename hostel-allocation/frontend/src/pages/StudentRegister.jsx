import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function StudentRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name:'', usn:'', mobile:'', gender:'Male',
    branch:'', semester:1, year:1, budget:'', password:''
  });

  const [pref, setPref] = useState({
    preferred_floor:1, preferred_block:'Block A', max_budget:'', roommate_preference:''
  });

  const [step, setStep] = useState(1);
  const [studentId, setStudentId] = useState(null);
  const [msg, setMsg] = useState('');
  const [errors, setErrors] = useState({});
  const [usnExists, setUsnExists] = useState(false);
  const [loading, setLoading] = useState(false);

  const branches = ['ISE','CSE','ECE','EEE','MECH','CIVIL','CHEM'];

  // 🔥 VALIDATION
  const validateStep1 = () => {
    let err = {};

    if (!form.name) err.name = 'Required';
    if (!form.usn) err.usn = 'Required';
    if (!form.mobile) err.mobile = 'Required';
    if (!form.branch) err.branch = 'Select branch';
    if (!form.budget) err.budget = 'Select budget';
    if (!form.password || form.password.length < 6)
      err.password = 'Min 6 characters';

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // 🔥 USN CHECK (LIVE)
  useEffect(() => {
    if (!form.usn) return;

    const check = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/students/check-usn/${form.usn}`);
        setUsnExists(res.data.exists);
      } catch {}
    };

    const delay = setTimeout(check, 500);
    return () => clearTimeout(delay);
  }, [form.usn]);

  // 🔥 PASSWORD STRENGTH
  const getStrength = () => {
    if (form.password.length > 8) return 'strong';
    if (form.password.length > 5) return 'medium';
    return 'weak';
  };

  // STEP 1 SUBMIT
  const handleRegister = async () => {
    console.log("FORM DATA:", form);
    console.log("Semester:", form.semester);
    if (!validateStep1() || usnExists) return;

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/students/register', form);
      setStudentId(res.data.id);
      setStep(2);
      setMsg('');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
    setLoading(false);
  };

  // STEP 2 SUBMIT
  const handlePreferences = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/students/preferences', {
        ...pref, student_id: studentId
      });
      setMsg('🎉 Registration complete!');
      setTimeout(() => navigate('/student-login'), 1200);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-100">

      <div className="w-full max-w-xl bg-white shadow-2xl rounded-2xl p-8 transition-all duration-500">

        <h2 className="text-3xl font-bold text-center mb-2">🏠 Register</h2>

        {/* STEP */}
        <div className="flex justify-center mb-5">
          <div className={`h-2 w-20 mx-1 rounded ${step===1?'bg-indigo-500':'bg-gray-300'}`}></div>
          <div className={`h-2 w-20 mx-1 rounded ${step===2?'bg-indigo-500':'bg-gray-300'}`}></div>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="grid grid-cols-2 gap-3 animate-fade">

            <input className="input" placeholder="Full Name"
              onChange={e=>setForm({...form,name:e.target.value})}/>
            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}

            <input className="input" placeholder="USN"
              onChange={e=>setForm({...form,usn:e.target.value})}/>
            {usnExists && <p className="text-red-500 text-xs">USN already exists</p>}

            <input className="input col-span-2" placeholder="Mobile"
              onChange={e=>setForm({...form,mobile:e.target.value})}/>

            <select className="input"
              onChange={e=>setForm({...form,gender:e.target.value})}>
              <option>Male</option>
              <option>Female</option>
            </select>

            <select className="input"
              onChange={e=>setForm({...form,branch:e.target.value, department:e.target.value})}>
              <option value="">Branch</option>
              {branches.map(b=> <option key={b}>{b}</option>)}
            </select>

            <select
  className="input"
  value={form.semester}
  onChange={e =>
    setForm({ ...form, semester: Number(e.target.value) })
  }
>
  <option value="">Select Sem</option>
  {[1,2,3,4,5,6,7,8].map(s => (
    <option key={s} value={s}>
      Sem {s}
    </option>
  ))}
</select>

            <select
  className="input"
  value={form.year}
  onChange={e =>
    setForm({ ...form, year: Number(e.target.value) })
  }
>
  <option value="">Select Year</option>
  <option value={1}>Year 1</option>
  <option value={2}>Year 2</option>
  <option value={3}>Year 3</option>
  <option value={4}>Year 4</option>
</select>

            <select className="input col-span-2"
              onChange={e=>setForm({...form,budget:e.target.value})}>
              <option value="">Budget</option>
              <option value="3000">₹3000</option>
              <option value="5000">₹5000</option>
              <option value="7000">₹7000</option>
            </select>

            {/* PASSWORD */}
            <div className="col-span-2">
              <input className="input w-full" type="password" placeholder="Password"
                onChange={e=>setForm({...form,password:e.target.value})}/>

              <div className="h-2 mt-1 rounded bg-gray-200">
                <div className={`h-2 rounded ${
                  getStrength()==='strong'?'bg-green-500 w-full':
                  getStrength()==='medium'?'bg-yellow-500 w-2/3':
                  'bg-red-500 w-1/3'
                }`}></div>
              </div>
            </div>

            <button
              disabled={loading}
              onClick={handleRegister}
              className="col-span-2 mt-2 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Next →'}
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="space-y-3 animate-fade">

            <select className="input"
              onChange={e=>setPref({...pref,preferred_floor:e.target.value})}>
              <option>Floor 1</option>
              <option>Floor 2</option>
              <option>Floor 3</option>
            </select>

            <select className="input"
              onChange={e=>setPref({...pref,preferred_block:e.target.value})}>
              <option>Block A</option>
              <option>Block B</option>
            </select>

            <select className="input"
              onChange={e=>setPref({...pref,max_budget:e.target.value})}>
              <option value="">Max Budget</option>
              <option value="3000">₹3000</option>
              <option value="5000">₹5000</option>
              <option value="7000">₹7000</option>
            </select>

            <input className="input" placeholder="Roommate USN"
              onChange={e=>setPref({...pref,roommate_preference:e.target.value})}/>

            <button
              onClick={handlePreferences}
              className="w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold"
            >
              Submit Registration
            </button>
          </div>
        )}

        {msg && <p className="text-center mt-4 text-sm text-green-500">{msg}</p>}

        <p className="mt-4 text-center text-sm">
          Already registered?{' '}
          <Link to="/student-login" className="text-indigo-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}