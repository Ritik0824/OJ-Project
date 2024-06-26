import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { Route, Routes } from 'react-router-dom';
import { post } from '../services/apiEndpoint';
import { Logout } from '../redux/AuthSlice';
import Navbar from '../components/dashboard/Navbar';
import Problem from '../components/problems/Problem';
import Contest from '../components/contest/Contest';
import Blog from '../components/blogs/Blogs';
import Courses from '../components/courses/Course';
import ProblemDetails from '../components/problems/problemdetails'; // Corrected import
import ProblemForm from '../components/problems/problemForm'; // Corrected import
import UpdatedProblem from '../components/problems/updateProblem'; // Corrected import
import FetchProblem from '../components/problems/fetchProblem';

export default function Home() {
  const user = useSelector((state) => state.Auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation(); // Use useLocation hook

  // Extract current page from location.pathname
  const currentPage = location.pathname.split('/').pop(); 

  const handleLogout = async () => {
    try {
      const response = await post('/api/auth/logout');
      if (response.status === 200) {
        dispatch(Logout());
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar currentPage={currentPage} handleSignOut={handleLogout} navigate={navigate} /> {/* Pass currentPage as prop */}
      <Routes>
        <Route path="/course" element={<Courses />} />
        <Route path="/problem" element={<Problem />} />
        <Route path="/contest" element={<Contest />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/get-problem/:id" element={<ProblemDetails />} />
        <Route path="/get-problem" element={<FetchProblem />} />
        {user && user.role === 'admin' && (
          <Route path="/update-problem" element={<UpdatedProblem />} />
        )}
        {user && user.role === 'admin' && (
          <Route path="/problem/new" element={<ProblemForm />} />
        )}
      </Routes>

      <div className='home-container'>
        <div className='user-card'>
          <h2>Welcome, {user && user.name}</h2>
          <button className='logout-btn' onClick={handleLogout}>Logout</button>
          {user && user.role === 'admin' && (
            <button className='admin-btn' onClick={() => navigate('/admin')}>Go To admin</button>
          )}
        </div>
      </div>
    </>
  );
}
