import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSearch, FaComments, FaBell, FaTh, FaUser, FaAngleDown } from 'react-icons/fa';
import { getAuth, signOut } from 'firebase/auth'; 
import { app } from '../../firebase'; 
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const currentPage = location.pathname.split('/').pop();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    const auth = getAuth(app); 
    signOut(auth)
      .then(() => {
        console.log('User signed out successfully');
        navigate('/login')
        // Redirect or perform other actions after sign-out
      })
      .catch((error) => {
        console.error('Error signing out:', error.message);
      });
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="bg-gray-800 px-4 py-2 flex justify-start items-center relative">
      <img className="h-8 w-auto" src="your-logo.svg" alt="Your Company Logo" />
      <div className="flex flex-nowrap overflow-hidden space-x-4 items-center ml-4">
        <Link
          to="/dashboard/problem"
          className={`text-white hover:text-gray-300 pb-1  text-decoration-none ${currentPage === 'problem' ? 'border-b-2 border-green-500 ' : ''}`}
        >
          Problems
        </Link>
        <Link
          to="/dashboard/course"
          className={`text-white hover:text-gray-300 pb-1 text-decoration-none ${currentPage === 'course' ? 'border-b-2 border-green-500' : ''}`}
        >
          Courses
        </Link>
        <Link
          to="/dashboard/contest"
          className={`text-white hover:text-gray-300 pb-1 text-decoration-none ${currentPage === 'contest' ? 'border-b-2 border-green-500' : ''}`}
        >
          Compete
        </Link>
        <Link
          to="/dashboard/blog"
          className={`text-white hover:text-gray-300 pb-1 text-decoration-none ${currentPage === 'blog' ? 'border-b-2 border-green-500' : ''}`}
        >
          Blogs
        </Link>
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
                  <Link to="/dashboard/profile">Profile</Link>
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
