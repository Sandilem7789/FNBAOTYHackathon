import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { useCart } from '../context/CartContext';

function GardenDetail() {
  const { id } = useParams(); // garden ID from URL
  const [garden, setGarden] = useState(null);
  const [produce, setProduce] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    // Fetch garden details
    api.get(`gardens/${id}/`)
      .then(res => setGarden(res.data))
      .catch(err => console.error('Garden fetch error:', err));

    // ✅ Fetch produce scoped to this garden
    api.get(`gardens/${id}/produce/`)
      .then(res => setProduce(res.data))
      .catch(err => console.error('Produce fetch error:', err));
  }, [id]);

  return (
    <div className="p-6 max-w-7xl mx-auto mt-20">
      {garden && (
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-emerald-800 mb-2">
            🌿 {garden.name}
          </h1>
          <p className="text-gray-600 text-lg">{garden.location}</p>
        </div>
      )}

      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Available Produce
      </h2>

      {produce.length === 0 ? (
        <p className="text-center text-gray-500">No produce available for this garden yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {produce.map(p => (
            <div key={p.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
              <img
                src={p.image || '/default.png'}
                alt={p.name}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h3 className="text-xl font-bold text-gray-900">{p.name}</h3>
              <p className="text-gray-700">{p.quantity} {p.unit}</p>
              <p className="text-gray-700 font-medium">R{p.price}</p>
              <button
                className="mt-3 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded"
                onClick={() => {
                  addToCart(p, 1);
                  alert(`${p.name} added to cart`);
                }}
              >
                Add to Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GardenDetail;
