import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api';

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const role = location.state?.role || 'vendor'; // default to vendor

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('login/', {
        username,
        password,
      });

      const { token, vendor_id, gardener_id } = response.data;
      console.log('Submitting login:', { username, password });

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // ✅ Store vendorId or gardenerId based on role
      if (role === 'vendor') {
        if (vendor_id && Number(vendor_id) > 0) {
          localStorage.setItem('vendorId', vendor_id);
          console.log('Vendor ID stored:', vendor_id);
        } else {
          console.warn('Vendor ID missing or invalid in response:', vendor_id);
          alert('Login succeeded but vendor ID is missing. Please contact support.');
          return;
        }
      } else if (role === 'gardener') {
        if (gardener_id && Number(gardener_id) > 0) {
          localStorage.setItem('gardenerId', gardener_id);
          console.log('Gardener ID stored:', gardener_id);
        } else {
          console.warn('Gardener ID missing or invalid in response:', gardener_id);
          alert('Login succeeded but gardener ID is missing. Please contact support.');
          return;
        }
      }

      // ✅ Redirect based on role
      if (role === 'vendor') {
        navigate('/vendor/dashboard');
      } else {
        navigate('/gardener/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert('Invalid credentials. Please try again.');
    }
  };


  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] px-4">
      <div className="bg-white bg-opacity-80 backdrop-blur-sm p-6 sm:p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          {isLogin
            ? `${role.charAt(0).toUpperCase() + role.slice(1)} Login`
            : `${role.charAt(0).toUpperCase() + role.slice(1)} Signup`}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="border rounded px-4 py-2"
              required
            />
          )}
          <input
            type="text"
            placeholder="Username"
            className="border rounded px-4 py-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded px-4 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded text-lg font-medium hover:bg-green-700 transition"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-sm">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
        </p>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full bg-gray-100 text-green-700 py-2 rounded text-lg font-medium hover:bg-gray-200 transition mt-2"
        >
          {isLogin ? 'Sign up' : 'Log in'}
        </button>
      </div>
    </div>
  );
};

export default AuthScreen;
