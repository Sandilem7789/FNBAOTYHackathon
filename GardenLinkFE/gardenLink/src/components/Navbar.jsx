import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaTachometerAlt, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const { items } = useCart();
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white bg-opacity-20 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-green-800 font-bold text-xl">
            GardenLink
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-green-900 hover:text-green-800 font-medium flex items-center gap-2">
              <FaHome /> Home
            </Link>
            <Link to={`/${role}/dashboard`} className="text-green-800 hover:text-green-900 font-medium flex items-center gap-2">
              <FaTachometerAlt /> Dashboard
            </Link>
            {role === 'vendor' && (
              <Link to="/cart" className="relative text-green-700 hover:text-green-900 font-medium flex items-center gap-2">
                <FaShoppingCart />
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-800 font-medium"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-green-700 focus:outline-none">
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/" className="block text-green-700 hover:text-green-900 font-medium flex items-center gap-2">
            <FaHome /> Home
          </Link>
          <Link to={`/${role}/dashboard`} className="block text-green-700 hover:text-green-900 font-medium flex items-center gap-2">
            <FaTachometerAlt /> Dashboard
          </Link>
          {role === 'vendor' && (
            <Link to="/cart" className="block text-green-700 hover:text-green-900 font-medium flex items-center gap-2">
              <FaShoppingCart /> Cart
            </Link>
          )}
          <button onClick={handleLogout} className="block text-red-600 hover:text-red-800 font-medium">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
