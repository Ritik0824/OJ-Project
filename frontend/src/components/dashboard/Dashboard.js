import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Problem from '../problems/Problem';
import Contest from '../contest/Contest';
import Blog from '../blogs/Blogs';
import Courses from '../courses/Course';
import ProblemDetails from '../problems/problemdetails'; // Adjusted import
import ProblemForm from '../problems/problemForm'; // Adjusted import

const Dashboard = () => {
  console.log("Dashboard page"); // Moved outside of JSX

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/course" element={<Courses />} />
        <Route path="/problem" element={<Problem />} />
        <Route path="/contest" element={<Contest />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/problem/:id" element={<ProblemDetails />} />
        <Route path="/problem/new" element={<ProblemForm />} />
      </Routes>
    </>
  );
};

export default Dashboard;
