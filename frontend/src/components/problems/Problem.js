import React from 'react';
import { Link } from 'react-router-dom';

const Problem = () => {
  console.log("Rendering Problem component...");
  const problems = [
    {
      id: 405,
      title: 'Prison Break',
      difficulty: 'Easy',
      submissions: 299,
      accuracy: 16.39,
      askedIn: '',
      topic: '',
      posts: '',
    },
    {
      id: 406,
      title: 'Ritik',
      difficulty: 'Medium',
      submissions: 29,
      accuracy: 66.39,
      askedIn: '',
      topic: '',
      posts: '',
    },
    // Add more problem objects here
  ];

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-12 ">
      <h1 className="text-3xl font-bold mb-4">Problems</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Difficulty</th>
              <th className="px-4 py-2">Submissions</th>
              <th className="px-4 py-2">Accuracy</th>
              <th className="px-4 py-2">Asked In</th>
              <th className="px-4 py-2">Topic</th>
              <th className="px-4 py-2">Posts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {problems.map((problem) => (
              <tr key={problem.id}>
                <td className="px-4 py-2">{problem.id}</td>
                <td className="px-4 py-2">
                  <Link to={`/dashboard/problem/${problem.id}-${problem.title}`} className="text-blue-500 hover:underline">
                    {problem.title}
                  </Link>
                </td>
                <td className="px-4 py-2">{problem.difficulty}</td>
                <td className="px-4 py-2">{problem.submissions}</td>
                <td className="px-4 py-2">{problem.accuracy}%</td>
                <td className="px-4 py-2">{problem.askedIn}</td>
                <td className="px-4 py-2">{problem.topic}</td>
                <td className="px-4 py-2">{problem.posts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Problem;
