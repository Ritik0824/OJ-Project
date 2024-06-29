// pages/Home.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { post } from '../services/apiEndpoint';
import { Logout } from '../redux/AuthSlice';
import HomeLayout from '../Layout/HomeLayout'; // Import the HomeLayout component
import Problem from '../components/problems/Problem';
import Contest from '../components/contest/Contest';
import Blog from '../components/blogs/Blogs';
import Courses from '../components/courses/Course';
import ProblemDetails from '../components/problems/problemdetails';
import ProblemForm from '../components/problems/problemForm';
import UpdatedProblem from '../components/problems/updateProblem';
import FetchProblem from '../components/problems/fetchProblem';
import { Routes, Route } from 'react-router-dom';

const Home = () => {
  const user = useSelector((state) => state.Auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

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
    <HomeLayout currentPage={currentPage} handleLogout={handleLogout} navigate={navigate}>
      {/* Routing setup */}
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
    </HomeLayout>
  );
}

export default Home;
