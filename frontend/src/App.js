import React from 'react';
import './index.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import Signup from './components/signup/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Signup />} />
      <Route path='/dashboard/*' element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/register" />} />
    </Routes>
  );
};

export default App;
