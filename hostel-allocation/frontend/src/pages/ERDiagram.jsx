export default function ERDiagram() {
  return (
    <div className="page">
      <h2>ER Diagram — Database Structure</h2>
      <div style={{overflowX:'auto', marginTop:'1rem'}}>
        <svg width="900" height="600" style={{background:'white', borderRadius:'12px', padding:'20px'}}>

          {/* Students */}
          <rect x="20" y="20" width="160" height="220" rx="8" fill="#e6f1fb" stroke="#185FA5" strokeWidth="1.5"/>
          <rect x="20" y="20" width="160" height="36" rx="8" fill="#185FA5"/>
          <text x="100" y="43" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Students</text>
          {['student_id (PK)','name','gender','year','branch','semester','budget','usn','mobile','password','priority_score'].map((f,i) => (
            <text key={i} x="32" y={72+i*16} fontSize="11" fill="#1a1a2e">{f}</text>
          ))}

          {/* Preferences */}
          <rect x="220" y="20" width="160" height="150" rx="8" fill="#e1f5ee" stroke="#0F6E56" strokeWidth="1.5"/>
          <rect x="220" y="20" width="160" height="36" rx="8" fill="#0F6E56"/>
          <text x="300" y="43" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Preferences</text>
          {['pref_id (PK)','student_id (FK)','preferred_floor','preferred_block','max_budget','roommate_pref'].map((f,i) => (
            <text key={i} x="232" y={72+i*16} fontSize="11" fill="#1a1a2e">{f}</text>
          ))}

          {/* Allocations */}
          <rect x="220" y="220" width="160" height="130" rx="8" fill="#faeeda" stroke="#854F0B" strokeWidth="1.5"/>
          <rect x="220" y="220" width="160" height="36" rx="8" fill="#854F0B"/>
          <text x="300" y="243" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Allocations</text>
          {['allocation_id (PK)','student_id (FK)','room_id (FK)','allocation_date','status'].map((f,i) => (
            <text key={i} x="232" y={272+i*16} fontSize="11" fill="#1a1a2e">{f}</text>
          ))}

          {/* Rooms */}
          <rect x="430" y="220" width="160" height="180" rx="8" fill="#FAEEDA" stroke="#854F0B" strokeWidth="1.5"/>
          <rect x="430" y="220" width="160" height="36" rx="8" fill="#BA7517"/>
          <text x="510" y="243" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Rooms</text>
          {['room_id (PK)','block_id (FK)','floor','capacity','price','availability_status','room_type','ac_type','washroom'].map((f,i) => (
            <text key={i} x="442" y={272+i*16} fontSize="11" fill="#1a1a2e">{f}</text>
          ))}

          {/* Hostel_Block */}
          <rect x="430" y="20" width="160" height="130" rx="8" fill="#EEEDFE" stroke="#534AB7" strokeWidth="1.5"/>
          <rect x="430" y="20" width="160" height="36" rx="8" fill="#534AB7"/>
          <text x="510" y="43" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Hostel_Block</text>
          {['block_id (PK)','block_name','gender_allowed','total_rooms'].map((f,i) => (
            <text key={i} x="442" y={72+i*16} fontSize="11" fill="#1a1a2e">{f}</text>
          ))}

          {/* Notifications */}
          <rect x="640" y="20" width="160" height="130" rx="8" fill="#FCEBEB" stroke="#A32D2D" strokeWidth="1.5"/>
          <rect x="640" y="20" width="160" height="36" rx="8" fill="#A32D2D"/>
          <text x="720" y="43" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Notifications</text>
          {['notif_id (PK)','student_id (FK)','message','is_read','created_at'].map((f,i) => (
            <text key={i} x="652" y={72+i*16} fontSize="11" fill="#1a1a2e">{f}</text>
          ))}

          {/* Relationships */}
          {/* Students -> Preferences */}
          <line x1="180" y1="80" x2="220" y2="80" stroke="#0F6E56" strokeWidth="1.5" strokeDasharray="4"/>
          <text x="195" y="75" fontSize="10" fill="#0F6E56">1:1</text>

          {/* Students -> Allocations */}
          <line x1="180" y1="200" x2="220" y2="260" stroke="#854F0B" strokeWidth="1.5" strokeDasharray="4"/>
          <text x="185" y="240" fontSize="10" fill="#854F0B">1:1</text>

          {/* Allocations -> Rooms */}
          <line x1="380" y1="280" x2="430" y2="280" stroke="#854F0B" strokeWidth="1.5" strokeDasharray="4"/>
          <text x="395" y="275" fontSize="10" fill="#854F0B">N:1</text>

          {/* Rooms -> Hostel_Block */}
          <line x1="510" y1="220" x2="510" y2="150" stroke="#534AB7" strokeWidth="1.5" strokeDasharray="4"/>
          <text x="515" y="190" fontSize="10" fill="#534AB7">N:1</text>

          {/* Students -> Notifications */}
          <line x1="100" y1="20" x2="720" y2="20" stroke="#A32D2D" strokeWidth="1" strokeDasharray="4"/>
          <line x1="720" y1="20" x2="720" y2="20" stroke="#A32D2D" strokeWidth="1.5" strokeDasharray="4"/>
          <text x="400" y="15" fontSize="10" fill="#A32D2D">1:N</text>

        </svg>
      </div>
    </div>
  );
}