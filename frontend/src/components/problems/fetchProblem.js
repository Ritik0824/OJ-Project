import React, { useContext } from 'react';
import ProblemContext from './problemContext';
import { Link } from 'react-router-dom';

const FetchProblem = () => {
  const { problems } = useContext(ProblemContext);

  if (!problems || problems.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Problem Set</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {problems.map((problem) => (
          <div key={problem._id} className="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
            <h3 className="text-xl font-semibold mb-2">
              <Link to={`/get-problem/${problem._id}`} className="text-decoration-none text-black hover:text-blue-500">
                {problem.problemName}
              </Link>
            </h3>
            <p className="text-gray-700 mb-2">{problem.description.slice(0, 100)}...</p>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>
                Difficulty: {' '}
                <span className={`font-semibold ${
                  problem.difficulty === 'Easy' ? 'text-green-500' :
                  problem.difficulty === 'Medium' ? 'text-yellow-500' :
                  problem.difficulty === 'Hard' ? 'text-red-500' : ''
                }`}>
                  {problem.difficulty}
                </span>
              </span>
              <span>Submissions: {problem.submissions}</span>
              <span>Marks: {problem.marks}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FetchProblem;
