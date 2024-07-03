import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaComments, FaBell, FaTh, FaUser, FaAngleDown } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../dashboard/Logo.png';
import { Logout } from '../../redux/AuthSlice';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { post } from '../../services/apiEndpoint';

const Navbar = ({ currentPage }) => {
  const user = useSelector(state => state.Auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = async () => {
    try {
      const response = await post('/api/auth/logout');
      await signOut(auth);
      if (response.status === 200) {
        dispatch(Logout());
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('email'); 
        navigate('/login');
        toast.success('Successfully logged out');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = () => {
    navigate('/update-problem');
  };

  return (
    <nav className="bg-custom-dark-blue px-4 py-2 flex justify-start items-center relative">
      <Link to="/" className="flex items-center">
        <img className="h-8 w-auto transform transition-transform duration-300 hover:scale-110" src={logo} alt="Your Company Logo" />
      </Link>
      <div className="flex flex-nowrap overflow-hidden space-x-4 items-center ml-4">
        <Link
          to="/get-problem"
          className={`text-white hover:text-gray-300 pb-1 text-decoration-none ${currentPage === 'get-problem' ? 'border-b-2 border-green-500 ' : ''}`}
        >
          Problems
        </Link>
        <Link
          to="/course"
          className={`text-white hover:text-gray-300 pb-1 text-decoration-none ${currentPage === 'course' ? 'border-b-2 border-green-500' : ''}`}
        >
          Courses
        </Link>
        <Link
          to="/contest"
          className={`text-white hover:text-gray-300 pb-1 text-decoration-none ${currentPage === 'contest' ? 'border-b-2 border-green-500' : ''}`}
        >
          Compete
        </Link>
        <Link
          to="/blog"
          className={`text-white hover:text-gray-300 pb-1 text-decoration-none ${currentPage === 'blog' ? 'border-b-2 border-green-500' : ''}`}
        >
          Blogs
        </Link>
        {user && user.role === 'admin' && (
          <>
            <Link
              to="/problem/new"
              className={`text-white hover:text-gray-300 pb-1 text-decoration-none ${currentPage === 'new' ? 'border-b-2 border-green-500' : ''}`}
            >
              Add Problem
            </Link>
            <button
              onClick={handleUpdate}
              className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-md"
            >
              Update Problem
            </button>
          </>
        )}
      </div>
      <div className="flex items-center ml-auto space-x-4">
        <div className="relative">
          <input
            className="rounded-md bg-gray-700 px-2 py-1 text-white pl-10"
            type="text"
            placeholder="Search"
            style={{ textIndent: '20px' }}
          />
          <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <FaComments className="text-white hover:text-gray-300" />
        <FaBell className="text-white hover:text-gray-300" />
        <FaTh className="text-white hover:text-gray-300" />
        <div className="relative cursor-pointer" onClick={toggleDropdown}>
          <FaUser className="text-white hover:text-gray-300" />
          {showDropdown && (
            <div className="absolute right-0 mt-2 bg-gray-800 rounded shadow-md">
              <ul className="p-2">
                <li className="text-white hover:bg-gray-700 p-2 rounded cursor-pointer">
                  <Link to="/home/profile">Profile</Link>
                </li>
                <li className="text-white hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={handleSignOut}>
                  Sign Out
                </li>
              </ul>
            </div>
          )}
          <FaAngleDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
