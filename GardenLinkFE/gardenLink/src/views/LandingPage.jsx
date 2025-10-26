import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate(`/${role}/login`);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-b from-green-100 to-green-50 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 mb-4">
          🌿 Welcome to GardenLink
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-6">
          Connect local gardens with vendors. Choose your role to begin.
        </p>
        <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
          <button
            onClick={() => handleRoleSelect('vendor')}
            className="w-full bg-green-600 text-white py-3 rounded-md text-lg font-medium shadow hover:bg-green-700 transition"
          >
            I’m a Vendor
          </button>
          <button
            onClick={() => handleRoleSelect('gardener')}
            className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium shadow hover:bg-blue-700 transition"
          >
            I’m a Gardener
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
