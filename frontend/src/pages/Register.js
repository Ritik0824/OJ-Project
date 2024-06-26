import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { post } from '../services/apiEndpoint';
import { toast } from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await post('/api/auth/register', { name, email, password });
      const { data, status } = response;

      if (status === 200) {
        toast.success(data.message);
      }
      console.log(data);
    } catch (error) {
      console.log('Registration error:', error);
      toast.error('Failed to register. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      {/* Gradient overlay covering the entire background */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-rgba(55, 1, 97, 0.963) z-[-1]"></div>

      <div className="login-page bg-white rounded-lg border border-gray-300 shadow-md text-center p-6 max-w-[400px] w-full">
        <div className="close-button" aria-label="Close">
          <i className="fas fa-times"></i>
        </div>
        <h1 className="text-2xl font-bold mb-3">Register</h1>
        <h2 className="text-lg font-normal mb-4">Signup for a new account</h2>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:border-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:border-blue-400"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:border-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full h-10 px-4 bg-teal-600 text-white rounded-md text-lg hover:bg-teal-500 transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="register-link mt-4 text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-teal-600 hover:text-teal-500 transition duration-300">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
