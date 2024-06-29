import React from 'react';

const Contest = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-indigo-600 flex flex-col justify-center items-center">
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Contest Page</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Upcoming Contest</h2>
            <p className="text-lg text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero in erat cursus volutpat.</p>
            <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Join Contest</button>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Previous Contests</h2>
            <ul className="divide-y divide-gray-200">
              <li className="py-2">
                <span className="text-lg text-gray-700">Contest Name 1</span>
                <span className="ml-2 text-sm text-gray-500">Date: 2024-06-29</span>
              </li>
              <li className="py-2">
                <span className="text-lg text-gray-700">Contest Name 2</span>
                <span className="ml-2 text-sm text-gray-500">Date: 2024-06-28</span>
              </li>
              <li className="py-2">
                <span className="text-lg text-gray-700">Contest Name 3</span>
                <span className="ml-2 text-sm text-gray-500">Date: 2024-06-27</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p>Explore more contests and challenges!</p>
          <a href="/all-contests" className="text-blue-500 hover:underline">View All Contests</a>
        </div>
      </div>
    </div>
  );
};

export default Contest;
