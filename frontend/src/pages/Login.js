import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser } from '../redux/AuthSlice';
import { post } from '../services/apiEndpoint';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../firebase';
import axios from 'axios';

export default function Login() {
  const user = useSelector((state) => state.Auth);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await post('/api/auth/login', { email, password });
      const { data, status } = response;

      if (status === 200) {
        const { user, message } = data;
        if (user.role === 'admin') {
          navigate('/', { replace: true }); // Redirect to the root URL and replace history
           // Fallback redirection using window.location
        } else if (user.role === 'user') {
          navigate('/', { replace: true }); // Redirect to the root URL and replace history
           // Fallback redirection using window.location
        }
        toast.success(message);
        dispatch(SetUser(user));
        localStorage.setItem('email', email);
        console.log('Email stored in local storage:', email);
      }
    } catch (error) {
      console.log('Login error:', error);
      toast.error('Failed to login. Please try again.');
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      await axios.get('http://localhost:4000/sync-google-users');
      console.log('Login successful:', result);
      localStorage.setItem('token', result.user.accessToken);
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('email', result.user.email);
      console.log('Navigating to /');
      navigate('/', { replace: true });
    } catch (error) {
      console.log('Login failed:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="gradient-overlay fixed top-0 left-0 w-full h-full bg-gradient-to-b from-rgba(55, 1, 97, 0.963) to-black z-[-1]"></div>
      <div className="login-page min-w-[400px] w-70% p-6 bg-white rounded-lg border border-gray-300 shadow-md text-center mx-auto">
        <button className="close-button absolute top-2 right-2">
          <i className="fas fa-times"></i>
        </button>
        <h1 className="text-2xl font-bold mb-3">Login</h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3 border border-gray-300 rounded-md text-sm bg-gray-100 focus:outline-none focus:border-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              id="password"
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
            Log In
          </button>
        </form>

        <div className="text-sm text-gray-600">
          <p className="mb-4">Not registered? <Link to='/register' className="text-teal-600 hover:text-teal-500 transition duration-300">Register here</Link></p>
          <p className="mb-4">Forgot password? <Link to='/forgotPassword' className="text-teal-600 hover:text-teal-500 transition duration-300">Reset it here</Link></p>
        </div>
        
        <div className="or mb-4 text-sm font-bold text-gray-600">or</div>

        <div className="social-buttons">
          <button
            type="button"
           onClick={loginWithGoogle}
            className="google-login-btn w-full h-10 px-4 border border-gray-300 rounded-md flex items-center justify-center text-sm hover:bg-gray-200 transition duration-300"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
              alt="Google Logo"
              className="w-5 mr-2"
            />
            Continue with Google
          </button>
        </div>

      </div>
    </div>
  );
}
