import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 px-4 py-2 flex justify-start items-center">
      <img className="h-8 w-auto" src="your-logo.svg" alt="Your Company Logo" />
      <div className="flex space-x-4 items-start ">
        <a href="/dashboard/problem" className="text-white hover:text-gray-300 text-decoration-none active:border-b-2 active:border-green-500">Prepare</a>
        <a href="/dashboard/contest" className="text-white hover:text-gray-300 text-decoration-none">Compete</a>
        <a href="/dashboard/blog" className="text-white hover:text-gray-300 text-decoration-none">Blogs</a>
      </div>
      <input className="rounded-md ml-auto bg-gray-700 px-2 py-1 text-white" type="text" placeholder="Search" />
    </nav>
  );
};

export default Navbar;
