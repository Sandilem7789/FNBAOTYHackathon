import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const MainLayout = () => {
  return (
    <div className="relative min-h-screen w-screen bg-cover bg-center overflow-x-hidden" style={{ backgroundImage: "url('/garden-bg.png')" }}>
      {/* Background image */}
      <img
        src="/garden-bg.png"
        alt="Garden background"
        className="absolute inset-0 w-full h-full object-cover blur-sm z-0"
      />

      {/* Blur overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-sm z-0"></div>

      {/* Navbar */}
      <Navbar />

      {/* Page content */}
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
