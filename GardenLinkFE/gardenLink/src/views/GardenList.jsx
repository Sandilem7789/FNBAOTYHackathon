import { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

function GardenList() {
  const [gardens, setGardens] = useState([]);

  useEffect(() => {
    api.get('gardens/')
      .then(res => setGardens(res.data))
      .catch(err => console.error('Error fetching gardens:', err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🌿 Community Gardens</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gardens.map(g => (
          <Link to={`/gardens/${g.id}`} key={g.id} className="bg-white rounded shadow p-4 hover:shadow-lg transition">
            <img src={g.image} alt={g.name} className="w-full h-40 object-cover rounded" />
            <h2 className="text-lg font-semibold mt-2">{g.name}</h2>
            <p className="text-sm text-gray-600">{g.location}</p>
            <p className="text-sm">Contact: {g.contact_person}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GardenList;
