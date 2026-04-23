export default function ERDiagram() {
  return (
    <div className="page">
      <h2>ER Diagram — Database Structure</h2>
      <div style={{overflowX:'auto', marginTop:'1rem'}}>
        <svg width="1000" height="680" style={{background:'white', borderRadius:'12px', padding:'20px'}}>

          {/* Students */}
          <rect x="20" y="20" width="170" height="210" rx="8" fill="#e6f1fb" stroke="#185FA5" strokeWidth="1.5"/>
          <rect x="20" y="20" width="170" height="36" rx="8" fill="#185FA5"/>
          <text x="105" y="43" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Students</text>
          {['student_id (PK)','name','gender','year','branch','semester','budget','usn','mobile','password'].map((f,i) => (
            <text key={i} x="32" y={72+i*16} fontSize="11" fill="#1a1a2e">{f}</text>
          ))}

          {/* Preferences */}
          <rect x="230" y="20" width="170" height="150" rx="8" fill="#e1f5ee" stroke="#0F6E56" strokeWidth="1.5"/>
          <rect x="230" y="20" width="170" height="36" rx="8" fill="#0F6E56"/>
          <text x="315" y="43" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Preferences</text>
          {['pref_id (PK)','student_id (FK)','preferred_floor','preferred_block','max_budget','roommate_pref'].map((f,i) => (
            <text key={i} x="242" y={72+i*16} fontSize="11" fill="#1a1a2e">{f}</text>
          ))}

          {/* Allocations */}
          <rect x="230" y="210" width="170" height="130" rx="8" fill="#faeeda" stroke="#854F0B" strokeWidth="1.5"/>
          <rect x="230" y="210" width="170" height="36" rx="8" fill="#854F0B"/>
          <text x="315" y="233" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Allocations</text>
          {['allocation_id (PK)','student_id (FK)','room_id (FK)','allocation_date','status'].map((f,i) => (
            <text key={i} x="242" y={262+i*16} fontSize="11" fill="#1a1a2e">{f}</text>
          ))}

          {/* Rooms */}
          <rect x="440" y="210" width="170" height="180" rx="8" fill="#FAEEDA" stroke="#854F0B" strokeWidth="1.5"/>
          <rect x="440" y="210" width="170" height="36" rx="8" fill="#BA7517"/>
          <text x="525" y="233" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Rooms</text>
          {['room_id (PK)','block_id (FK)','floor','capacity','price','availability_status','room_type','ac_type','washroom'].map((f,i) => (
            <text key={i} x="452" y={262+i*16} fontSize="11" fill="#1a1a2e">{f}</text>
          ))}

          {/* Hostel_Block */}
          <rect x="440" y="20" width="170" height="115" rx="8" fill="#EEEDFE" stroke="#534AB7" strokeWidth="1.5"/>
          <rect x="440" y="20" width="170" height="36" rx="8" fill="#534AB7"/>
          <text x="525" y="43" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Hostel_Block</text>
          {['block_id (PK)','block_name','gender_allowed','total_rooms'].map((f,i) => (
            <text key={i} x="452" y={72+i*16} fontSize="11" fill="#1a1a2e">{f}</text>
          ))}

          {/* Notifications */}
          <rect x="650" y="20" width="170" height="130" rx="8" fill="#FCEBEB" stroke="#A32D2D" strokeWidth="1.5"/>
          <rect x="650" y="20" width="170" height="36" rx="8" fill="#A32D2D"/>
          <text x="735" y="43" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Notifications</text>
          {['notif_id (PK)','student_id (FK)','message','is_read','created_at'].map((f,i) => (
            <text key={i} x="662" y={72+i*16} fontSize="11" fill="#1a1a2e">{f}</text>
          ))}

          {/* Waitlist */}
          <rect x="650" y="200" width="170" height="115" rx="8" fill="#e1f5ee" stroke="#0F6E56" strokeWidth="1.5"/>
          <rect x="650" y="200" width="170" height="36" rx="8" fill="#0F6E56"/>
          <text x="735" y="223" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">Waitlist</text>
          {['waitlist_id (PK)','student_id (FK)','requested_at','status'].map((f,i) => (
            <text key={i} x="662" y={252+i*16} fontSize="11" fill="#1a1a2e">{f}</text>
          ))}

          {/* Relationships */}
          <line x1="190" y1="80" x2="230" y2="80" stroke="#0F6E56" strokeWidth="1.5" strokeDasharray="4"/>
          <text x="205" y="75" fontSize="10" fill="#0F6E56">1:1</text>

          <line x1="190" y1="200" x2="230" y2="260" stroke="#854F0B" strokeWidth="1.5" strokeDasharray="4"/>
          <text x="195" y="240" fontSize="10" fill="#854F0B">1:1</text>

          <line x1="400" y1="270" x2="440" y2="270" stroke="#854F0B" strokeWidth="1.5" strokeDasharray="4"/>
          <text x="412" y="265" fontSize="10" fill="#854F0B">N:1</text>

          <line x1="525" y1="210" x2="525" y2="135" stroke="#534AB7" strokeWidth="1.5" strokeDasharray="4"/>
          <text x="530" y="178" fontSize="10" fill="#534AB7">N:1</text>

          <line x1="105" y1="20" x2="735" y2="20" stroke="#A32D2D" strokeWidth="1" strokeDasharray="4"/>
          <text x="400" y="15" fontSize="10" fill="#A32D2D">1:N</text>

          <line x1="190" y1="150" x2="650" y2="240" stroke="#0F6E56" strokeWidth="1" strokeDasharray="4"/>
          <text x="390" y="185" fontSize="10" fill="#0F6E56">1:N</text>

        </svg>
      </div>
    </div>
  );
}