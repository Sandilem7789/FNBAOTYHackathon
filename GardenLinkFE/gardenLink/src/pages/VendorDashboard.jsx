import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const allGardens = [
  { id: 1, name: 'Msimanga Gardens', location: 'Msimanga', produceCount: 12, distance: 5 },
  { id: 2, name: 'Isandlwana Greens', location: 'Isandlwana', produceCount: 8, distance: 25 },
  { id: 3, name: 'Nongoma Harvest', location: 'Nongoma', produceCount: 15, distance: 8 },
];

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [showNearbyOnly, setShowNearbyOnly] = useState(false);

  const filteredGardens = showNearbyOnly
    ? allGardens.filter((g) => g.distance <= 10)
    : allGardens;

  const handleGardenClick = (id) => {
    navigate(`/vendor/garden/${id}`);
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-green-100 to-green-50 flex flex-col items-center px-4 py-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
        🌿 Gardens Near You
      </h1>

      {/* Filter Toggle */}
      <div className="flex gap-6 mb-8">
        <label className="flex items-center gap-2 text-green-800 font-medium">
          <input
            type="radio"
            name="filter"
            checked={!showNearbyOnly}
            onChange={() => setShowNearbyOnly(false)}
          />
          Show All Gardens
        </label>
        <label className="flex items-center gap-2 text-green-800 font-medium">
          <input
            type="radio"
            name="filter"
            checked={showNearbyOnly}
            onChange={() => setShowNearbyOnly(true)}
          />
          Nearby Only (≤ 10km)
        </label>
      </div>

      {/* Garden Grid */}
      <div className="grid gap-6 w-full max-w-6xl sm:grid-cols-2 md:grid-cols-3">
        {filteredGardens.map((garden) => (
          <div
            key={garden.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition cursor-pointer"
            onClick={() => handleGardenClick(garden.id)}
          >
            <h2 className="text-xl font-semibold text-green-700">{garden.name}</h2>
            <p className="text-sm text-gray-600">{garden.location}</p>
            <p className="text-sm text-gray-800 mt-2">
              {garden.produceCount} items available
            </p>
            <p className="text-xs text-gray-500">Distance: {garden.distance} km</p>
            <button
              className="mt-4 bg-green-700 text-white font-semibold py-2 px-4 rounded shadow hover:bg-green-800 transition-colors duration-200"
            >
              View Garden
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorDashboard;
