// components/HomeLayout.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/dashboard/Navbar';

const HomeLayout = ({ currentPage, handleLogout, navigate, children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/'; // Check if it's the home page
  const user = useSelector((state) => state.Auth.user);

  return (
    <>
      <Navbar currentPage={currentPage} handleSignOut={handleLogout} navigate={navigate} />
      
      {isHomePage && (
        <div className="home-container bg-gray-100 min-h-screen flex flex-col justify-center items-center">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="welcome-section bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-3xl font-bold mb-2">Welcome, {user && user.name}</h2> {/* Ensure user name displays correctly */}
              <button className="logout-btn bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleLogout}>Logout</button>
              {user && user.role === 'admin' && (
                <button className="admin-btn bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-2" onClick={() => navigate('/admin')}>Go To Admin</button>
              )}
            </div>

            <div className="banner mb-6">
              <img src="https://cdn.vectorstock.com/i/500p/23/07/web-blue-banner-software-ui-and-development-vector-42172307.jpg" alt="Banner" className="banner-image rounded-lg shadow-lg" />
            </div>

            <div className="feature-section bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Featured Sections</h2>
              <div className="flex flex-wrap -mx-4">
                <div className="feature-card px-4 w-full md:w-1/3 mb-4">
                  <h3 className="text-lg font-semibold mb-2">Explore Courses</h3>
                  <p>Discover our wide range of courses</p>
                  <button className="btn btn-primary bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-2" onClick={() => navigate('/course')}>Explore</button>
                </div>
                <div className="feature-card px-4 w-full md:w-1/3 mb-4">
                  <h3 className="text-lg font-semibold mb-2">Compete in Contests</h3>
                  <p>Participate in competitive coding contests</p>
                  <button className="btn btn-primary bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded mt-2" onClick={() => navigate('/contest')}>Join Contest</button>
                </div>
                <div className="feature-card px-4 w-full md:w-1/3 mb-4">
                  <h3 className="text-lg font-semibold mb-2">Read Our Blogs</h3>
                  <p>Stay updated with the latest tech articles</p>
                  <button className="btn btn-primary bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded mt-2" onClick={() => navigate('/blog')}>Read Blogs</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Render children for dynamic content */}
      {children}
    </>
  );
};

export default HomeLayout;
