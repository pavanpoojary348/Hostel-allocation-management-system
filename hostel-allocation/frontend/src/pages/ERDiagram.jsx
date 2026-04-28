export default function ERDiagram() {
  return (
    <div className="p-6 max-w-7xl mx-auto">

      <h2 className="text-3xl font-bold mb-4">
        📊 ER Diagram
      </h2>

      <div className="bg-white shadow-2xl rounded-2xl p-4 overflow-x-auto">

        <div className="min-w-[1100px] bg-gray-50 p-4 rounded-xl">

          {/* ✅ ONLY ONE SVG */}
          <svg width="1100" height="700">

            {/* STUDENTS */}
            <g>
              <rect x="40" y="40" width="200" height="230" rx="10" fill="#e6f1fb" stroke="#185FA5" strokeWidth="2"/>
              <rect x="40" y="40" width="200" height="40" rx="10" fill="#185FA5"/>
              <text x="140" y="65" textAnchor="middle" fill="white" fontWeight="bold">Students</text>

              {['student_id (PK)','name','gender','year','branch','semester','budget','usn','mobile','password']
                .map((f,i)=>(
                  <text key={i} x="55" y={95 + i*16} fontSize="12">{f}</text>
                ))}
            </g>

            {/* PREFERENCES */}
            <g>
              <rect x="300" y="40" width="200" height="170" rx="10" fill="#e1f5ee" stroke="#0F6E56" strokeWidth="2"/>
              <rect x="300" y="40" width="200" height="40" rx="10" fill="#0F6E56"/>
              <text x="400" y="65" textAnchor="middle" fill="white" fontWeight="bold">Preferences</text>

              {['pref_id (PK)','student_id (FK)','preferred_floor','preferred_block','max_budget','roommate_pref']
                .map((f,i)=>(
                  <text key={i} x="315" y={95 + i*16} fontSize="12">{f}</text>
                ))}
            </g>

            {/* HOSTEL BLOCK */}
            <g>
              <rect x="580" y="40" width="200" height="140" rx="10" fill="#eeedfe" stroke="#534AB7" strokeWidth="2"/>
              <rect x="580" y="40" width="200" height="40" rx="10" fill="#534AB7"/>
              <text x="680" y="65" textAnchor="middle" fill="white" fontWeight="bold">Hostel_Block</text>

              {['block_id (PK)','block_name','gender_allowed','total_rooms']
                .map((f,i)=>(
                  <text key={i} x="595" y={95 + i*16} fontSize="12">{f}</text>
                ))}
            </g>

            {/* NOTIFICATIONS */}
            <g>
              <rect x="860" y="40" width="200" height="150" rx="10" fill="#fdeaea" stroke="#a32d2d" strokeWidth="2"/>
              <rect x="860" y="40" width="200" height="40" rx="10" fill="#a32d2d"/>
              <text x="960" y="65" textAnchor="middle" fill="white" fontWeight="bold">Notifications</text>

              {['notif_id (PK)','student_id (FK)','message','is_read','created_at']
                .map((f,i)=>(
                  <text key={i} x="875" y={95 + i*16} fontSize="12">{f}</text>
                ))}
            </g>

            {/* ALLOCATIONS */}
            <g>
              <rect x="300" y="300" width="200" height="140" rx="10" fill="#faeeda" stroke="#854F0B" strokeWidth="2"/>
              <rect x="300" y="300" width="200" height="40" rx="10" fill="#854F0B"/>
              <text x="400" y="325" textAnchor="middle" fill="white" fontWeight="bold">Allocations</text>

              {['allocation_id (PK)','student_id (FK)','room_id (FK)','allocation_date','status']
                .map((f,i)=>(
                  <text key={i} x="315" y={355 + i*16} fontSize="12">{f}</text>
                ))}
            </g>

            {/* ROOMS */}
            <g>
              <rect x="580" y="300" width="220" height="200" rx="10" fill="#faeeda" stroke="#ba7517" strokeWidth="2"/>
              <rect x="580" y="300" width="220" height="40" rx="10" fill="#ba7517"/>
              <text x="690" y="325" textAnchor="middle" fill="white" fontWeight="bold">Rooms</text>

              {['room_id (PK)','block_id (FK)','floor','capacity','price','availability_status','room_type','ac_type','washroom']
                .map((f,i)=>(
                  <text key={i} x="595" y={355 + i*16} fontSize="12">{f}</text>
                ))}
            </g>

            {/* WAITLIST */}
            <g>
              <rect x="860" y="300" width="200" height="140" rx="10" fill="#e1f5ee" stroke="#0F6E56" strokeWidth="2"/>
              <rect x="860" y="300" width="200" height="40" rx="10" fill="#0F6E56"/>
              <text x="960" y="325" textAnchor="middle" fill="white" fontWeight="bold">Waitlist</text>

              {['waitlist_id (PK)','student_id (FK)','requested_at','status']
                .map((f,i)=>(
                  <text key={i} x="875" y={355 + i*16} fontSize="12">{f}</text>
                ))}
            </g>

            {/* RELATION LINES */}
            <line x1="240" y1="120" x2="300" y2="120" stroke="gray" strokeDasharray="4"/>
            <text x="260" y="110" fontSize="12">1:1</text>

            <line x1="240" y1="220" x2="300" y2="340" stroke="gray" strokeDasharray="4"/>
            <text x="250" y="300" fontSize="12">1:1</text>

            <line x1="500" y1="360" x2="580" y2="360" stroke="gray" strokeDasharray="4"/>
            <text x="530" y="350" fontSize="12">N:1</text>

            <line x1="690" y1="300" x2="690" y2="180" stroke="gray" strokeDasharray="4"/>
            <text x="700" y="230" fontSize="12">N:1</text>

          </svg>

        </div>
      </div>
    </div>
  );
}