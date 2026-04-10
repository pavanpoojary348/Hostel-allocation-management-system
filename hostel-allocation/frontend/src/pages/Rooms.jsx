import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/rooms').then(res => setRooms(res.data));
  }, []);

  return (
    <div className="page">
      <h2>Rooms</h2>
      <table>
        <thead>
          <tr>
            <th>Room ID</th>
            <th>Floor</th>
            <th>Capacity</th>
            <th>Price</th>
            <th>Status</th>
            <th>Block ID</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map(r => (
            <tr key={r.room_id}>
              <td>{r.room_id}</td>
              <td>{r.floor}</td>
              <td>{r.capacity}</td>
              <td>₹{r.price}</td>
              <td>
                <span className={r.availability_status === 'Available' ? 'badge badge-green' : 'badge badge-red'}>
                  {r.availability_status}
                </span>
              </td>
              <td>{r.block_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}