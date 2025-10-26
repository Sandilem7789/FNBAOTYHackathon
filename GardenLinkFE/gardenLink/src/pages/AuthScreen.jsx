import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        username: email, // or full name if you're using that
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/vendor/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-green-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-green-800 mb-4 text-center">
          {isLogin ? 'Vendor Login' : 'Vendor Signup'}
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
            type="email"
            placeholder="Email"
            className="border rounded px-4 py-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded px-4 py-2"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded text-lg font-medium hover:bg-green-700 transition"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="w-full bg-gray-100 text-green-700 py-2 rounded text-lg font-medium hover:bg-gray-200 transition mt-2"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;
