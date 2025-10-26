import { useEffect, useState } from 'react';
import api from '../api';

function ProduceList() {
  const [produce, setProduce] = useState([]);

  useEffect(() => {
    api.get('produce/')
      .then(res => setProduce(res.data))
      .catch(err => console.error('Produce fetch error:', err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Available Produce</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {produce.map(p => (
          <div key={p.id} className="bg-white rounded shadow p-4">
            <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded" />
            <h2 className="text-lg font-bold mt-2">{p.name}</h2>
            <p>{p.quantity} {p.unit}</p>
            <p className="text-sm text-gray-600">Garden: {p.garden_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProduceList;
