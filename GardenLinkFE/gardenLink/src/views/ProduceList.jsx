import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

function ProduceList() {
  const [produce, setProduce] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    api.get(`gardens/${id}/produce/`)
      .then(res => setProduce(res.data))
      .catch(err => console.error('Produce fetch error:', err));
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-green-800 text-center">🌿 All Available Produce</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produce.map(p => (
          <div key={p.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition">
            {p.image ? (
              <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded mb-3" />
            ) : (
              <div className="w-full h-40 bg-green-100 flex items-center justify-center text-green-800 rounded mb-3">
                No Image
              </div>
            )}
            <h2 className="text-lg font-bold text-green-700 mb-1">{p.name}</h2>
            <p className="text-sm text-gray-700">Quantity: {p.quantity} {p.unit}</p>
            <p className="text-sm text-gray-700">Weight: {p.weight}kg</p>
            <p className="text-sm text-gray-700">Price: R{p.price}</p>
            <p className="text-xs text-gray-500 mt-2">Garden: {p.garden_name}</p>
            <button className="mt-4 bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700 transition">
              Add to Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProduceList;
