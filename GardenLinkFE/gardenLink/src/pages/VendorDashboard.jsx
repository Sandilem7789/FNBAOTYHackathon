import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [gardens, setGardens] = useState([]);
  const [showNearbyOnly, setShowNearbyOnly] = useState(false);

  useEffect(() => {
    api.get('gardens/')
      .then(res => {
        const enriched = res.data.map(g => ({
          ...g,
          distance: Math.floor(Math.random() * 30) + 1,
          produceCount: g.produce?.length || 0,
        }));
        setGardens(enriched);
      })
      .catch(err => console.error('Garden fetch error:', err));
  }, []);

  const filteredGardens = showNearbyOnly
    ? gardens.filter(g => g.distance <= 10)
    : gardens;

  const handleGardenClick = (id) => {
    navigate(`/vendor/garden/${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-green-800 mb-8 text-center">🌿 Gardens Near You</h1>

      {/* Filter Toggle */}
      <div className="flex gap-6 justify-center mb-10">
        <label className="flex items-center gap-2 text-green-800 font-medium text-lg">
          <input
            type="radio"
            name="filter"
            checked={!showNearbyOnly}
            onChange={() => setShowNearbyOnly(false)}
          />
          Show All Gardens
        </label>
        <label className="flex items-center gap-2 text-green-800 font-medium text-lg">
          <input
            type="radio"
            name="filter"
            checked={showNearbyOnly}
            onChange={() => setShowNearbyOnly(true)}
          />
          Nearby Only (≤ 10km)
        </label>
      </div>

      {/* Garden Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredGardens.map(garden => (
          <div
            key={garden.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-4 cursor-pointer"
            onClick={() => handleGardenClick(garden.id)}
          >
            {/* Static Garden Image */}
            <img
              src="/daytime-tinted.png"
              alt="Garden"
              className="w-full h-40 object-cover rounded mb-4"
            />

            {/* Garden Info */}
            <h2 className="text-2xl font-bold text-green-800 mb-1">{garden.name}</h2>
            <p className="text-lg text-gray-700">{garden.location}</p>
            <p className="text-md text-gray-800 mt-2">
              Items Available: {garden.produceCount}
            </p>
            <p className="text-sm text-gray-500">Distance: {garden.distance} km</p>

            <button className="mt-4 bg-green-600 text-white text-md px-4 py-2 rounded hover:bg-green-700 transition">
              View Garden
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorDashboard;
