import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Problem from '../problems/Problem';
import Contest from '../contest/Contest';
import Blog from '../blogs/Blogs';
import Courses from '../courses/Course';
import ProblemDetails from '../problems/problemdetails';

const Dashboard = () => {
  return (
    <>
    <Navbar />
      <Routes>
        console.log("Dashboard page");
        <Route path="/course" element={<Courses />} />
        <Route path="/problem" element={<Problem />} />
        <Route path="/contest" element={<Contest />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/problems/:id" element={<ProblemDetails />} />
      </Routes>
    </>
  )
}

export default Dashboard;
