import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { useCart } from '../context/CartContext';

function GardenDetail() {
  const { id } = useParams();
  const [garden, setGarden] = useState(null);
  const [produce, setProduce] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get(`gardens/${id}/`)
      .then(res => setGarden(res.data))
      .catch(err => console.error('Garden fetch error:', err));

    api.get(`produce/?garden=${id}`)
      .then(res => setProduce(res.data))
      .catch(err => console.error('Produce fetch error:', err));
  }, [id]);

  return (
    <div className="p-6">
      {garden && (
        <>
          <h1 className="text-2xl font-bold mb-2">{garden.name}</h1>
          <p className="text-gray-600 mb-4">{garden.location}</p>
        </>
      )}
      <h2 className="text-xl font-semibold mb-2">Available Produce</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {produce.map(p => (
          <div key={p.id} className="bg-white rounded shadow p-4">
            <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded" />
            <h3 className="text-lg font-bold mt-2">{p.name}</h3>
            <p>{p.quantity} {p.unit}</p>
            <button className="mt-2 bg-green-600 text-white px-3 py-1 rounded" onClick={() => addToCart(p, 1)}>Add to Order</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GardenDetail;
