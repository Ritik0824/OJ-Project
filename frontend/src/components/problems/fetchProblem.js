// FetchProblem.js

import React, { useContext } from 'react';
import ProblemContext from './problemContext'; // Correct import path
import { Link } from 'react-router-dom';

const FetchProblem = () => {
  const { problems } = useContext(ProblemContext);

  if (!problems || problems.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Problem List:</h2>
      <ul>
        {problems.map((problem) => (
          <li key={problem._id}>
            <div>
              <h3>
                <Link to={`/problem/${problem._id}`}>
                  {problem.problemName}
                </Link>
              </h3>
              {/* Add more details as needed */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchProblem;
