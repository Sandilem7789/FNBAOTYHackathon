import React, { useState, useEffect } from 'react';
import api from '../api';

const GardenerDashboard = () => {
  const [gardens, setGardens] = useState([]);
  const [produceList, setProduceList] = useState([]);
  const [showGardenForm, setShowGardenForm] = useState(false);
  const [showProduceForm, setShowProduceForm] = useState(false);

  const [newGarden, setNewGarden] = useState({
    name: '',
    location: '',
    contact_person: '',
    phone_number: '',
    latitude: '',
    longitude: '',
    image: null
  });

  const [newProduce, setNewProduce] = useState({
    garden: '',
    name: '',
    quantity: '',
    unit: 'kg',
    price: '',
    image: null
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setNewGarden((prev) => ({
          ...prev,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        }));
      },
      (err) => console.error("Location error:", err)
    );

    api.get('gardens/')
      .then(res => {
        setGardens(res.data);
        if (res.data.length > 0) {
          const gardenId = res.data[0].id;
          setNewProduce((prev) => ({ ...prev, garden: gardenId }));
          fetchProduce(gardenId);
        }
      })
      .catch(err => console.error('Failed to fetch gardens:', err));
  }, []);

  const fetchProduce = (gardenId) => {
    api.get(`gardens/${gardenId}/produce/`)
      .then(res => setProduceList(res.data))
      .catch(err => console.error('Produce fetch error:', err));
  };

  const handleAddGarden = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(newGarden).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        formData.append(key, value);
      }
    });

    try {
      await api.post('gardens/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setShowGardenForm(false);
      const updated = await api.get('gardens/');
      setGardens(updated.data);
    } catch (err) {
      console.error('Garden creation failed:', err);
    }
  };

  const handleDeleteProduce = async (id) => {
  if (!window.confirm('Are you sure you want to delete this produce item?')) return;
    try {
      await api.delete(`produce/${id}/`);
      fetchProduce(newProduce.garden);
    } catch (err) {
      console.error('Failed to delete produce:', err);
    }
  };


  const handleAddProduce = async (e) => {
    e.preventDefault();

    if (!newProduce.garden) {
      console.error('No garden ID set for produce.');
      alert('Please select or create a garden before adding produce.');
      return;
    }

    const formData = new FormData();

    Object.entries(newProduce).forEach(([key, value]) => {
      if (key === 'garden') {
        formData.append('garden', String(value));
      } else if (value !== null && value !== '') {
        formData.append(key, value);
      }
    });

    try {
      await api.post('produce/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setShowProduceForm(false);
      setNewProduce({ ...newProduce, name: '', quantity: '', unit: 'kg', price: '', image: null });
      fetchProduce(newProduce.garden);
    } catch (err) {
      console.error('Produce creation failed:', err);
    }
  };

  const handleAddHarvest = (produce) => {
    const quantity = prompt(`Add quantity to ${produce.name}:`);
    if (!quantity) return;

    const updated = {
      ...produce,
      quantity: parseInt(produce.quantity) + parseInt(quantity)
    };

    api.put(`produce/${produce.id}/`, updated)
      .then(() => fetchProduce(produce.garden))
      .catch(err => console.error('Failed to update produce:', err));
  };

  const garden = gardens[0];

  return (
    <div className="relative z-10 flex flex-col items-center px-4 py-8 pt-24">
      {garden ? (
        <>
          <div className="backdrop-blur-sm bg-white/30 px-4 py-2 rounded-md shadow-md mb-4">
            <select
              value={newProduce.garden}
              onChange={(e) => {
                const selectedGardenId = e.target.value;
                setNewProduce((prev) => ({ ...prev, garden: selectedGardenId }));
                fetchProduce(selectedGardenId);
              }}
              className="mb-4 w-full max-w-md border rounded px-4 py-2"
            >
              <option value="">Select a garden</option>
              {gardens.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name} — {g.location}
                </option>
              ))}
            </select>
            <h1 className="text-3xl font-bold text-green-800 text-center">
              {/*garden.name*/}
            </h1>
          </div>
          <div className="grid gap-6 w-full max-w-4xl sm:grid-cols-2 md:grid-cols-3 mb-6">
            {produceList.map((item) => (
              <div key={item.id} className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl shadow-md p-4 hover:shadow-lg transition">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                )}
                <h2 className="text-xl font-bold text-green-800 mb-2">{item.name}</h2>
                <div className="space-y-1 text-sm text-gray-700">
                  <p><span className="font-medium">Quantity:</span> {item.quantity}</p>
                  <p><span className="font-medium">Weight:</span>  {item.unit}</p>
                  <p><span className="font-medium">Price:</span> R{item.price}</p>
                </div>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleAddHarvest(item)}
                    className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700 transition"
                  >
                    Add Harvest
                  </button>
                  <button
                    onClick={() => handleDeleteProduce(item.id)}
                    className="bg-red-100 text-red-700 text-sm px-3 py-1 rounded hover:bg-red-300 transition border border-red-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowProduceForm(!showProduceForm)}
            className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add New Produce +
          </button>

          {showProduceForm && (
            <form onSubmit={handleAddProduce} className="mb-8 w-full max-w-xl space-y-4">
              <select
                value={newProduce.garden}
                onChange={(e) => setNewProduce({ ...newProduce, garden: e.target.value })}
                className="w-full border rounded px-4 py-2"
                required
              >
                <option value="">Select a garden</option>
                {gardens.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>

              <input type="text" placeholder="Produce Name" value={newProduce.name}
                onChange={(e) => setNewProduce({ ...newProduce, name: e.target.value })}
                className="w-full border rounded px-4 py-2" required />
              <input type="number" placeholder="Quantity" value={newProduce.quantity}
                onChange={(e) => setNewProduce({ ...newProduce, quantity: e.target.value })}
                className="w-full border rounded px-4 py-2" required />
              <input type="text" placeholder="Unit" value={newProduce.unit}
                onChange={(e) => setNewProduce({ ...newProduce, unit: e.target.value })}
                className="w-full border rounded px-4 py-2" />
              <input type="number" placeholder="Price (R)" value={newProduce.price}
                onChange={(e) => setNewProduce({ ...newProduce, price: e.target.value })}
                className="w-full border rounded px-4 py-2" required />
              <input type="file" accept="image/*"
                onChange={(e) => setNewProduce({ ...newProduce, image: e.target.files[0] })}
                className="w-full border rounded px-4 py-2" />
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Save Produce
              </button>
            </form>
          )}
        </>
      ) : (
        <>
          <button
            onClick={() => setShowGardenForm(!showGardenForm)}
            className="mb-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Garden +
          </button>

          {showGardenForm && (
            <form onSubmit={handleAddGarden} className="mb-8 w-full max-w-xl space-y-4">
              <input type="text" placeholder="Name" value={newGarden.name}
                onChange={(e) => setNewGarden({ ...newGarden, name: e.target.value })}
                className="w-full border rounded px-4 py-2" required />
              <input type="text" placeholder="Location" value={newGarden.location}
                onChange={(e) => setNewGarden({ ...newGarden, location: e.target.value })}
                className="w-full border rounded px-4 py-2" required />
              <input type="text" placeholder="Contact Person" value={newGarden.contact_person}
                onChange={(e) => setNewGarden({ ...newGarden, contact_person: e.target.value })}
                className="w-full border rounded px-4 py-2" required />
              <input type="text" placeholder="Phone Number" value={newGarden.phone_number}
                onChange={(e) => setNewGarden({ ...newGarden, phone_number: e.target.value })}
                className="w-full border rounded px-4 py-2" required />
              <input type="text" placeholder="Latitude" value={newGarden.latitude}
                readOnly className="w-full border rounded px-4 py-2 bg-gray-100" />
              <input type="text" placeholder="Longitude" value={newGarden.longitude}
                readOnly className="w-full border rounded px-4 py-2 bg-gray-100" />
              <input type="file" accept="image/*"
                onChange={(e) => setNewGarden({ ...newGarden, image: e.target.files[0] })}
                className="w-full border rounded px-4 py-2" />
              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                Save Garden
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default GardenerDashboard;